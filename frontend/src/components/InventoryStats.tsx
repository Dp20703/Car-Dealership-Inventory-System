interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

interface InventoryStatsProps {
  vehicles: Vehicle[];
}

const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) => (
  <div className="tw-card p-5 flex items-center gap-4">
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${accent}`}
    >
      {label === "Listings" && "🚗"}
      {label === "Units in stock" && "📦"}
      {label === "Low stock" && "⚠️"}
    </div>
    <div>
      <p className="text-2xl font-mono font-semibold tabular-nums leading-tight">
        {value}
      </p>
      <p className="text-sm text-text-muted dark:text-text-darkMuted">
        {label}
      </p>
    </div>
  </div>
);

export const InventoryStats = ({ vehicles }: InventoryStatsProps) => {
  const totalListings = vehicles.length;
  const totalUnits = vehicles.reduce((sum, v) => sum + v.quantity, 0);
  const lowStockCount = vehicles.filter(
    (v) => v.quantity > 0 && v.quantity <= 3,
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard label="Listings" value={totalListings} accent="bg-primary/10" />
      <StatCard
        label="Units in stock"
        value={totalUnits}
        accent="bg-secondary/10"
      />
      <StatCard
        label="Low stock"
        value={lowStockCount}
        accent="bg-amber-500/10"
      />
    </div>
  );
};

export const InventoryStatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="tw-card p-5 flex items-center gap-4">
        <div className="tw-skeleton-circle w-11 h-11" />
        <div className="flex-1">
          <div className="tw-skeleton-text w-12 h-6 mb-2" />
          <div className="tw-skeleton-text w-24 h-3" />
        </div>
      </div>
    ))}
  </div>
);
