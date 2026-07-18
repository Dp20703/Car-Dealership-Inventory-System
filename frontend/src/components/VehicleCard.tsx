interface VehicleCardProps {
  vehicle: any;
  isAdmin: boolean;
  onPurchase: () => void;
  onEdit: () => void;
  onRestock: () => void;
  onDelete: () => void; // Add this prop
}

export const VehicleCard = ({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}: any) => (
  <div className="tw-card p-6 tw-card-hover border-t-4 border-t-primary/20">
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
        {vehicle.make} {vehicle.model}
      </h3>
      <span className="tw-badge-primary">
        ${vehicle.price.toLocaleString()}
      </span>
    </div>

    <p className="text-sm text-text-muted mt-4">
      Available Units: {vehicle.quantity}
    </p>

    <div className="flex gap-2 mt-6">
      {isAdmin ? (
        <div className="flex gap-5">
          <button onClick={onRestock} className="tw-btn-success !px-2">
            Restock
          </button>
          <button onClick={onEdit} className="tw-btn-secondary !px-2">
            Edit
          </button>
          <button onClick={onDelete} className="tw-btn-danger !px-2">
            Delete
          </button>
        </div>
      ) : (
        <button onClick={onPurchase} className="tw-btn-primary flex-1">
          Purchase
        </button>
      )}
    </div>
  </div>
);
