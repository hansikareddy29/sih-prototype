// app/(app)/student/attendance/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';

function StudentAttendancePage() {
  // In a real app, this data would be fetched for the specific logged-in student
  const myAttendance = [
    { date: '2024-09-27', status: 'Present' },
    { date: '2024-09-26', status: 'Present' },
    { date: '2024-09-25', status: 'Absent' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Attendance History</h1>
      <p className={styles.subtitle}>A daily log of your attendance records.</p>
      <div className={styles.card}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', paddingBottom: '0.5rem', borderBottom: '2px solid #333'}}>
          <span>Date</span>
          <span>Status</span>
        </div>
        {myAttendance.map(record => (
          <div key={record.date} style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #eee'}}>
            <span>{record.date}</span>
            <span style={{color: record.status === 'Present' ? 'green' : 'red', fontWeight: 'bold'}}>
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRoleGuard(['student'])(StudentAttendancePage);