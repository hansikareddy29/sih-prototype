// app/(app)/teacher/manage-students/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';
function ManageStudentsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Students</h1>
      <p className={styles.subtitle}>View student details for your classes.</p>
      <div className={styles.card}>
        <p>List of students in Class 5 & 6 would be displayed here for editing.</p>
      </div>
    </div>
  );
}
export default withRoleGuard(['teacher'])(ManageStudentsPage);