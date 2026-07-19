interface VehicleCardSkeletonProps {
  isAdmin?: boolean;
}

export const VehicleCardSkeleton = ({
  isAdmin = false,
}: VehicleCardSkeletonProps) => (
  <div className="tw-tag-card" role="status" aria-label="Loading vehicle">
    <div className="tw-tag-plate">
      <div className="tw-skeleton h-4 w-24 bg-white/15" />
      <div className="tw-skeleton h-3 w-14 bg-white/10" />
    </div>

    <div className="tw-tag-perforation" />

    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="tw-skeleton-badge" />
        <div className="tw-skeleton-text w-16 h-3" />
      </div>

      <div className="flex items-end justify-between pb-3">
        <div className="tw-skeleton-text w-10 h-3" />
        <div className="tw-skeleton-text w-24 h-7" />
      </div>

      {isAdmin ? (
        <div className="grid grid-cols-3 gap-2">
          <div className="tw-skeleton-btn" />
          <div className="tw-skeleton-btn" />
          <div className="tw-skeleton-btn" />
        </div>
      ) : (
        <div className="tw-skeleton-btn" />
      )}
    </div>

    <span className="sr-only">Loading vehicle details…</span>
  </div>
);
