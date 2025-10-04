// app/(app)/student/dashboard/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import Link from 'next/link';
import styles from '../../Dashboard.module.css';
import StatCircle from '../../../components/StatCircle';
import { FaCalendarCheck, FaBox, FaSchool } from 'react-icons/fa';

function StudentDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Student Dashboard</h1>
      <p className={styles.subtitle}>Your personal attendance and resource summary.</p>

      <div className={styles.grid} style={{justifyContent: 'center', marginBottom: '3rem'}}>
    <StatCircle value={3} label="Total Days Present" color="#22c55e" />
    <StatCircle value={2} label="Resources Received" color="#3b82f6" />
  </div>

  <div className={styles.grid}>
    <Link href="/student/attendance" className={`${styles.linkCard} ${styles.green}`}>
      <FaCalendarCheck size={24} />
      <h3>View Your Attendance</h3>
      <p>Check your daily attendance history.</p>
    </Link>
    <Link href="/student/resources" className={`${styles.linkCard} ${styles.blue}`}>
      <FaBox size={24} />
      <h3>Resources You Received</h3>
      <p>See a list of all items you have received.</p>
    </Link>
    <Link href="/student/available-resources" className={`${styles.linkCard} ${styles.orange}`}>
      <FaSchool size={24} />
      <h3>Available School Resources</h3>
      <p>Check new resources available from the school.</p>
    </Link>
</div>
</div>
  );
}

export default withRoleGuard(['student'])(StudentDashboard);