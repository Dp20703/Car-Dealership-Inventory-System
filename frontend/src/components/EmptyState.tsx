import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description = "There are currently no records to display. Add a new item to get started.",
  actionLabel,
  onAction,
  icon = "🗂️",
  className = "",
}) => {
  return (
    <div className={`tw-card tw-empty p-12 mt-10 text-center ${className}`}>
      <div className="text-6xl mb-6">{icon}</div>
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-text-muted dark:text-text-darkMuted max-w-xl mx-auto">
        {description}
      </p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="tw-btn tw-btn-primary mt-8"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
