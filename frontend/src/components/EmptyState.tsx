import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description = "There are currently no records to display. Add a new item to get started.",
  actionLabel,
  onAction,
}) => {
  return (
    <div
      className="empty-state-container"
      style={{ textAlign: "center", padding: "2rem" }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗂️</div>
      <h2 style={{ margin: "0 0 0.5rem" }}>{title}</h2>
      <p style={{ margin: 0, color: "#666" }}>{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
