// app/(app)/admin/manage-teachers/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';
// This would fetch data, but we'll use a mock array
function ManageTeachersPage() {
  const teachers = [
    { id: 't1', name: 'Ms. Geeta Sharma', class: '5' },
    { id: 't2', name: 'Mr. Vikram Rathore', class: '6' },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Teachers</h1>
      <p className={styles.subtitle}>Add, edit, or remove teacher accounts.</p>
      <div className={styles.card}>
        {/* List of teachers would be mapped here */}
        {teachers.map(teacher => <div key={teacher.id} style={{padding: '0.5rem 0'}}>{teacher.name} - Class {teacher.class}</div>)}
      </div>
    </div>
  );
}
export default withRoleGuard(['admin'])(ManageTeachersPage);