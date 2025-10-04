// app/(app)/teacher/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import withRoleGuard from '../../../components/withRoleGuard';
import Link from 'next/link';
import styles from '../../Dashboard.module.css';
import { FaUsers, FaTasks, FaBoxOpen, FaChartLine, FaPlus, FaFolderOpen } from 'react-icons/fa';
import api from '../../../api/axios';
import CameraModal from '../../../components/CameraModal';

function TeacherDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, todaysAttendance: 0, resourcesDistributed: 0, syncStatus: 'syncing'});
  const [isCameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    api.get('/stats/teacher/teacher-01').then(res => setStats(res.data));
  }, []);

  const handleCapture = () => {
    alert("Attendance Marked (Simulated).");
    setCameraOpen(false);
  };

  return (
    <>
      <CameraModal isOpen={isCameraOpen} onClose={() => setCameraOpen(false)} onCapture={handleCapture} />
      <div className={styles.container}>
        <h1 className={styles.title}>Teacher Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
        
        {/* STATS CARDS */}
        <div className={styles.grid}>
            <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.totalStudents}</h2><p>Enrolled Students</p></div>
            <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.todaysAttendance}</h2><p>Students Marked Today</p></div>
            <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.resourcesDistributed}</h2><p>Items Distributed</p></div>
            <div className={`${styles.card} ${styles.statCard}`}><h2>✓</h2><p>All Synced</p></div>
        </div>

        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.grid}>
          <div className={`${styles.linkCard} ${styles.green}`} onClick={() => setCameraOpen(true)}>
            <FaTasks size={24} /><h3>Take Attendance</h3><p>Upload group photos.</p>
          </div>
          <Link href="/teacher/distribute" className={`${styles.linkCard} ${styles.blue}`}>
            <FaBoxOpen size={24} /><h3>Distribute Resources</h3><p>Record resource distribution.</p>
          </Link>
          <Link href="/shared/reports" className={`${styles.linkCard} ${styles.orange}`}>
            <FaChartLine size={24} /><h3>View Reports</h3><p>Check attendance reports.</p>
          </Link>
  
          <Link href="/teacher/manage-students" className={`${styles.linkCard} ${styles.purple}`}>
    <FaUsers size={24} />
    <h3>Manage Students</h3>
    <p>Add or edit student information.</p>
</Link>
        </div>
      </div>
    </>
  );
}
export default withRoleGuard(['teacher'])(TeacherDashboard);