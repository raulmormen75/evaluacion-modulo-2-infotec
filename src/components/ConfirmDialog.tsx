interface ConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({ isOpen, onCancel, onConfirm }: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <div
        className="dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        aria-describedby="reset-description"
      >
        <h2 id="reset-title">Reiniciar evaluación</h2>
        <p id="reset-description">
          Se borrará tu avance y la evidencia generada. El modo claro u oscuro se conservará.
        </p>
        <div className="dialog-actions">
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="action-button danger-button" onClick={onConfirm}>
            Sí, reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
