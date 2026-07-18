import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { updateVehicle } from "../api/vehicle.api";
import { toast } from "react-hot-toast";

export const EditVehicleModal = ({
  isOpen,
  onClose,
  vehicle,
  onUpdate,
}: any) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: 0,
    quantity: 0,
  });

  // Populate form with existing vehicle data
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
    try {
      await updateVehicle(vehicle._id, formData);
      toast.success("Vehicle updated successfully!");
      onUpdate(); // Refresh the list
      onClose();
    } catch (error) {
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Vehicle">
      <input
        className="tw-input mb-4"
        value={formData.make}
        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
      />
      <input
        className="tw-input mb-4"
        value={formData.model}
        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
      />
      <input
        className="tw-input mb-4"
        type="number"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />
      <input
        className="tw-input mb-4"
        type="number"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({ ...formData, quantity: Number(e.target.value) })
        }
      />
      <button onClick={handleUpdate} className="tw-btn-primary w-full">
        Save Changes
      </button>
    </Modal>
  );
};
