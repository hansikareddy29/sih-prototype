// app/(app)/student/available-resources/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';
function AvailableResourcesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available School Resources</h1>
      <p className={styles.subtitle}>These items are available for distribution from the school office.</p>
      <div className={styles.card}>
        <ul>
            <li>Science Textbook (Class 5)</li>
            <li>Uniform Set (Medium)</li>
            <li>Mid-Day Meal Supplies (Weekly)</li>
        </ul>
      </div>
    </div>
  );
}
export default withRoleGuard(['student'])(AvailableResourcesPage);