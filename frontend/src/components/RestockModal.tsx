import { useState } from "react";
import { Modal } from "./Modal";
import { restockVehicle } from "../api/vehicle.api";
import { toast } from "react-hot-toast";

export const RestockModal = ({ isOpen, onClose, vehicle, onUpdate }: any) => {
  const [quantity, setQuantity] = useState(0);

  const handleRestock = async () => {
    try {
      console.log("quantity to updated:", quantity);
      await restockVehicle(vehicle._id, quantity);
      toast.success("Inventory restocked!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to restock");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Restock ${vehicle.make}`}>
      <input
        className="tw-input mb-4"
        type="number"
        placeholder="Quantity to add"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleRestock} className="tw-btn-success w-full">
        Confirm Restock
      </button>
    </Modal>
  );
};
