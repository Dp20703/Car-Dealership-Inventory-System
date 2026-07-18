interface VehicleCardSkeletonProps {
  isAdmin?: boolean;
}

export const VehicleCardSkeleton = ({
  isAdmin = false,
}: VehicleCardSkeletonProps) => (
  <div
    className="tw-card p-6 border-t-4 border-t-primary/10"
    role="status"
    aria-label="Loading vehicle"
  >
    <div className="flex justify-between items-start">
      <div className="tw-skeleton-text w-2/3" />
      <div className="tw-skeleton-badge" />
    </div>

    <div className="tw-skeleton-text w-1/2 mt-4" />

    <div className="flex gap-2 mt-6">
      {isAdmin ? (
        <div className="flex gap-5 w-full">
          <div className="tw-skeleton-btn w-16" />
          <div className="tw-skeleton-btn w-16" />
          <div className="tw-skeleton-btn w-16" />
        </div>
      ) : (
        <div className="tw-skeleton-btn flex-1" />
      )}
    </div>

    <span className="sr-only">Loading vehicle details…</span>
  </div>
);
