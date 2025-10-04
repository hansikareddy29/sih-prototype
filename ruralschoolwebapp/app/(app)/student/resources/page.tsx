// app/(app)/student/resources/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';
// This page would fetch data, but we'll use mock data for the UI
function StudentResources() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Your Resources</h1>
        <p className={styles.subtitle}>A log of all items you have received.</p>
        <div className={styles.card}>
             <h3>Received Items</h3>
             <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', paddingBottom: '0.5rem', borderBottom: '2px solid #333'}}>
                <span>Resource Name</span>
                <span>Date Received</span>
                <span>Barcode</span>
             </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee'}}>
                <span>Science Textbook (Class 5)</span>
                <span>2024-09-20</span>
                <span>978-3-16-148410-0</span>
            </div>
             <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0'}}>
                <span>Uniform Set (Medium)</span>
                <span>2024-09-18</span>
                <span>123-4-56-789012-3</span>
            </div>
        </div>
    </div>
  );
}
export default withRoleGuard(['student'])(StudentResources);