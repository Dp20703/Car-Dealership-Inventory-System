import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { updateVehicle } from "../api/vehicle.api";
import { FormField } from "./FormField";
import { Modal } from "./Modal";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  onUpdate: () => void;
}

export const EditVehicleModal = ({
  isOpen,
  onClose,
  vehicle,
  onUpdate,
}: EditVehicleModalProps) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: 0,
    quantity: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Populate form with existing vehicle data whenever a new vehicle is selected
  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        price: vehicle.price,
        quantity: vehicle.quantity,
      });
    }
  }, [vehicle]);

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await updateVehicle(vehicle._id, formData);
      toast.success("Vehicle updated successfully!");
      onUpdate();
      onClose();
    } catch {
      toast.error("Failed to update vehicle");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Vehicle"
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
            onClick={handleUpdate}
            disabled={isSaving}
            className="tw-btn-primary min-w-[9rem] disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <FormField
          label="Make"
          value={formData.make}
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          required
        />
        <FormField
          label="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          required
        />
        <FormField
          label="Price (₹)"
          type="number"
          min={0}
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />
        <FormField
          label="Quantity"
          type="number"
          min={0}
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: Number(e.target.value) })
          }
          required
        />
      </form>
    </Modal>
  );
};
