// app/components/EditStockModal.tsx
'use client';
import { useState, useEffect } from 'react';
import styles from '../(app)/Dashboard.module.css';

interface Resource {
  resourceId: string;
  name: string;
  totalStock: number;
}

interface EditStockModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (resourceId: string, newStock: number) => Promise<void>;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ resource, isOpen, onClose, onSave }) => {
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    if (resource) {
      setNewStock(resource.totalStock);
    }
  }, [resource]);

  if (!isOpen || !resource) return null;

  const handleSave = async () => {
    await onSave(resource.resourceId, newStock);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Update Stock for "{resource.name}"</h3>
        <p>Enter the new total quantity received from the government.</p>
        <div style={{ margin: '1.5rem 0' }}>
          <label htmlFor="stock" style={{ fontWeight: 500 }}>New Total Stock</label>
          <input
            id="stock"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
            className={styles.modalInput}
          />
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.modalButtonSecondary}>Cancel</button>
          <button onClick={handleSave} className={styles.modalButtonPrimary}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditStockModal;