interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  isAdmin: boolean;
  onPurchase: () => void;
  onEdit: () => void;
  onRestock: () => void;
  onDelete: () => void;
}

const RestockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
    <path
      d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
    <path
      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const stockBadge = (quantity: number) => {
  if (quantity === 0)
    return { label: "Out of stock", className: "tw-badge-danger" };
  if (quantity <= 3)
    return { label: "Low stock", className: "tw-badge-warning" };
  return { label: "In stock", className: "tw-badge-success" };
};

export const VehicleCard = ({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}: VehicleCardProps) => {
  const stock = stockBadge(vehicle.quantity);

  return (
    <div className="tw-card tw-card-hover flex flex-col p-6 border-t-4 border-t-primary/20">
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark leading-snug">
          {vehicle.make} {vehicle.model}
        </h3>
        <span className="tw-badge-primary shrink-0">
          ₹{vehicle.price.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className={stock.className}>{stock.label}</span>
        <span className="text-sm text-text-muted dark:text-text-darkMuted">
          {vehicle.quantity} unit{vehicle.quantity === 1 ? "" : "s"} available
        </span>
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-border-light dark:border-border-dark">
        {isAdmin ? (
          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              onClick={onRestock}
              className="tw-btn-success !px-2"
              aria-label={`Restock ${vehicle.make} ${vehicle.model}`}
            >
              <RestockIcon />
              <span className="hidden sm:inline">Restock</span>
            </button>
            <button
              onClick={onEdit}
              className="tw-btn-secondary !px-2"
              aria-label={`Edit ${vehicle.make} ${vehicle.model}`}
            >
              <EditIcon />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="tw-btn-danger !px-2"
              aria-label={`Delete ${vehicle.make} ${vehicle.model}`}
            >
              <DeleteIcon />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onPurchase}
            disabled={vehicle.quantity === 0}
            className="tw-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {vehicle.quantity === 0 ? "Sold Out" : "Purchase"}
          </button>
        )}
      </div>
    </div>
  );
};
