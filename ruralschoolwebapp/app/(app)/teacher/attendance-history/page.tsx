// app/(app)/teacher/attendance-history/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';

function TeacherAttendanceHistory() {
    // In a real app, this data would be fetched from the backend
    const mockHistory = [
        {id: 1, name: 'Rohan Sharma', date: '2024-09-27', status: 'Present'},
        {id: 2, name: 'Priya Verma', date: '2024-09-27', status: 'Absent'},
        {id: 3, name: 'Amit Kumar', date: '2024-09-27', status: 'Present'},
    ];
    
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Attendance History</h1>
        <p className={styles.subtitle}>Viewing records for all students.</p>
        <div className={styles.card}>
            {/* You would map over fetched data here */}
            {mockHistory.map(record => (
                <div key={record.id} style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee'}}>
                    <span>{record.name}</span>
                    <span>{record.date}</span>
                    <span style={{color: record.status === 'Present' ? 'green' : 'red', fontWeight: 'bold'}}>{record.status}</span>
                </div>
            ))}
        </div>
    </div>
  );
}

export default withRoleGuard(['teacher'])(TeacherAttendanceHistory);