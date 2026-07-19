import { useState } from "react";
import { toast } from "react-hot-toast";
import { restockVehicle } from "../api/vehicle.api";
import { FormField } from "./FormField";
import { Modal } from "./Modal";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  quantity: number;
}

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  onUpdate: () => void;
}

export const RestockModal = ({
  isOpen,
  onClose,
  vehicle,
  onUpdate,
}: RestockModalProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleRestock = async () => {
    if (quantity <= 0) {
      toast.error("Enter a quantity greater than zero");
      return;
    }

    setIsSaving(true);
    try {
      await restockVehicle(vehicle._id, quantity);
      toast.success("Inventory restocked!");
      onUpdate();
      onClose();
    } catch {
      toast.error("Failed to restock");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Restock ${vehicle.make} ${vehicle.model}`}
      footer={
        <>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="tw-btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleRestock}
            disabled={isSaving}
            className="tw-btn-success min-w-[9rem] disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Saving…
              </>
            ) : (
              "Confirm Restock"
            )}
          </button>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRestock();
        }}
      >
        <p className="text-sm text-text-muted dark:text-text-darkMuted mb-4">
          Currently <span className="font-semibold">{vehicle.quantity}</span>{" "}
          unit{vehicle.quantity === 1 ? "" : "s"} in stock.
        </p>
        <FormField
          label="Quantity to add"
          type="number"
          min={1}
          placeholder="e.g. 5"
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          autoFocus
          required
        />
      </form>
    </Modal>
  );
};
