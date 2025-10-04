// app/(app)/admin/manage-resources/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';
function ManageResourcesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Resources</h1>
      <p className={styles.subtitle}>Track stock and distribution of all resources.</p>
      <div className={styles.card}>
        {/* Resource list would be here */}
        <p>Science Textbooks: 25 remaining</p>
        <p>Uniform Sets: 60 remaining</p>
      </div>
    </div>
  );
}
export default withRoleGuard(['admin'])(ManageResourcesPage);