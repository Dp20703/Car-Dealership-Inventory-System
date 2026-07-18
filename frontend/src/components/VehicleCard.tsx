interface VehicleCardProps {
  vehicle: any;
  isAdmin: boolean;
  onPurchase: () => void;
}

export const VehicleCard = ({
  vehicle,
  isAdmin,
  onPurchase,
}: VehicleCardProps) => (
  <div className="tw-card p-6 tw-card-hover">
    <h3 className="text-xl font-bold">
      {vehicle.make} {vehicle.model}
    </h3>
    <p className="text-primary font-semibold mt-2">${vehicle.price}</p>
    <p className="text-sm text-text-muted">Stock: {vehicle.quantity}</p>

    <div className="flex gap-2 mt-4">
      <button onClick={onPurchase} className="tw-btn-primary">
        Purchase
      </button>
      {isAdmin && (
        <>
          <button className="tw-btn-secondary">Edit</button>
          <button className="tw-btn-danger">Delete</button>
        </>
      )}
    </div>
  </div>
);
