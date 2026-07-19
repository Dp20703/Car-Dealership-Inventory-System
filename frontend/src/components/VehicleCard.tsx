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

const stockStatus = (quantity: number) => {
  if (quantity === 0)
    return {
      label: "Out of stock",
      className: "tw-badge-danger",
      dot: "bg-red-500",
    };
  if (quantity <= 3)
    return {
      label: "Low stock",
      className: "tw-badge-warning",
      dot: "bg-amber-500",
    };
  return {
    label: "In stock",
    className: "tw-badge-success",
    dot: "bg-green-500",
  };
};

// Derive a short, stable "stock number" from the record id — reads like a
// real dealer tag number instead of exposing the raw Mongo _id.
const stockNumber = (id: string) => id.slice(-6).toUpperCase();

export const VehicleCard = ({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}: VehicleCardProps) => {
  const status = stockStatus(vehicle.quantity);

  return (
    <div className="tw-tag-card">
      <div className="tw-tag-plate">
        <h3 className="tw-tag-make text-lg">
          {vehicle.make}
          <br />
          {vehicle.model}
        </h3>
        <span className="tw-tag-stock-no">STK #{stockNumber(vehicle._id)}</span>
      </div>

      <div className="tw-tag-perforation" />

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className={status.className}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          <span className="text-xs text-text-muted dark:text-text-darkMuted whitespace-nowrap">
            {vehicle.quantity} unit{vehicle.quantity === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex items-end justify-between border-b-2 border-secondary/60 pb-3">
          <span className="text-xs uppercase tracking-widest text-text-muted dark:text-text-darkMuted">
            Price
          </span>
          <span className="tw-tag-price text-3xl">
            ₹{vehicle.price.toLocaleString()}
          </span>
        </div>

        {isAdmin ? (
          <div className="grid grid-cols-3 gap-2">
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
            className="tw-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {vehicle.quantity === 0 ? "Sold Out" : "Purchase"}
          </button>
        )}
      </div>
    </div>
  );
};
