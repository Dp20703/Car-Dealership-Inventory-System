export const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="tw-overlay" onClick={onClose}>
      <div className="tw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tw-modal-header">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="tw-modal-body">{children}</div>
      </div>
    </div>
  );
};
