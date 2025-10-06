// app/(app)/admin/govt-resources/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import styles from '../../Dashboard.module.css';
import { FaEdit } from 'react-icons/fa';
import ProgressBar from '../../../components/ProgressBar';
import EditStockModal from '../../../components/EditStockModal';

interface Resource {
  resourceId: string;
  name: string;
  category: string;
  totalStock: number;
  distributedCount: number;
  lastUpdated: string;
}

function GovtResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources');
      // Filter for only government scheme resources
      setResources(response.data.filter((res: Resource) => res.category === 'Govt. Scheme'));
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpdateStock = async (resourceId: string, newStock: number) => {
    try {
      await api.post(`/resources/${resourceId}/update_stock`, { newTotalStock: newStock });
      alert("Stock updated successfully!");
      fetchResources(); // Refresh the data to show the change instantly
    } catch (error) {
      alert("Failed to update stock.");
    }
  };

  return (
    <>
      <EditStockModal
        isOpen={!!editingResource}
        resource={editingResource}
        onClose={() => setEditingResource(null)}
        onSave={handleUpdateStock}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Government Resource Management</h1>
        <p className={styles.subtitle}>Track inventory and distribution of items from government schemes.</p>

        <div className={styles.card}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Received</th>
                <th>Distributed</th>
                <th>Remaining</th>
                <th>Distribution Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Loading resources...</td></tr>
              ) : (
                resources.map(res => {
                  const remaining = res.totalStock - res.distributedCount;
                  return (
                    <tr key={res.resourceId}>
                      <td>{res.name}</td>
                      <td>{res.totalStock}</td>
                      <td>{res.distributedCount}</td>
                      <td style={{ fontWeight: 'bold' }}>{remaining}</td>
                      <td style={{ minWidth: '150px' }}>
                        <ProgressBar total={res.totalStock} consumed={res.distributedCount} color={remaining < (res.totalStock * 0.2) ? '#ef4444' : '#22c55e'} />
                      </td>
                      <td>
                        <button onClick={() => setEditingResource(res)} className={styles.editButton}>
                          <FaEdit /> Update
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default withRoleGuard(['admin'])(GovtResourcesPage);