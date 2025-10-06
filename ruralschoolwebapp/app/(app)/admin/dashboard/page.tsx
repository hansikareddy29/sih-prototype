// 'use client';
// import withRoleGuard from '../../../components/withRoleGuard';
// import { useEffect, useState } from 'react';
// import api from '../../../api/axios';
// import styles from '../../Dashboard.module.css'; // Import the CSS module
// import Link from 'next/link';
// import { FaUserPlus, FaUsersCog, FaChartBar, FaBoxes } from 'react-icons/fa';

// interface Stats {
//   students: number;
//   resources: number;
//   distributions: number;
// }

// function AdminDashboard() {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ... (useEffect hook remains the same)
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [studentRes, resourceRes, distRes] = await Promise.all([
//           api.get('/students'),
//           api.get('/resources'),
//           api.get('/distributions'),
//         ]);
//         setStats({
//           students: studentRes.data.length,
//           resources: resourceRes.data.length,
//           distributions: distRes.data.length,
//         });
//       } catch (error) {
//         console.error("Failed to fetch admin stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin Dashboard</h1>
//       <p className={styles.subtitle}>School-wide overview and management tools.</p>
//       {/* ... (Stats Cards Section) ... */}
//       <h2 className={styles.sectionTitle}>Management Actions</h2>
// <div className={styles.grid}>
//     <Link href="/admin/enroll-student" className={`${styles.linkCard} ${styles.green}`}>
//       <FaUserPlus size={24} />
//       <h3>Enroll New Student</h3>
//       <p>Add a new student to the school records.</p>
//     </Link>
//     <Link href="/admin/manage-teachers" className={`${styles.linkCard} ${styles.purple}`}>
//       <FaUsersCog size={24} />
//       <h3>Manage Teachers</h3>
//       <p>Add, edit, or remove teacher accounts.</p>
//     </Link>
//     <Link href="/shared/reports" className={`${styles.linkCard} ${styles.orange}`}>
//       <FaChartBar size={24} />
//       <h3>View Full Reports</h3>
//       <p>Generate detailed attendance and resource reports.</p>
//     </Link>
//     <Link href="/admin/manage-resources" className={`${styles.linkCard} ${styles.blue}`}>
//         <FaBoxes size={24} />
//         <h3>Manage Resources</h3>
//         <p>Track stock and distribution of all resources.</p>
//     </Link>
// </div>
//     </div>
//   );
// }
// export default withRoleGuard(['admin'])(AdminDashboard);
// app/(app)/admin/dashboard/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import styles from '../../Dashboard.module.css';
import Link from 'next/link';
import { FaUserPlus, FaUsersCog, FaChartBar, FaChalkboardTeacher, FaLandmark } from 'react-icons/fa';

interface Stats {
  students: number;
  resources: number;
  distributions: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentRes, resourceRes, distRes] = await Promise.all([
          api.get('/students'),
          api.get('/resources'),
          api.get('/distributions'),
        ]);
        setStats({
          students: studentRes.data.length,
          resources: resourceRes.data.length,
          distributions: distRes.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <p className={styles.subtitle}>School-wide overview and management tools.</p>

      <h2 className={styles.sectionTitle}>Live Statistics</h2>
      <div className={styles.grid}>
        {loading ? (
          <p>Loading stats...</p>
        ) : (
          <>
            <div className={`${styles.card} ${styles.statCard}`}>
              <h2>{stats?.students ?? 0}</h2>
              <p>Total Students</p>
            </div>
            <div className={`${styles.card} ${styles.statCard}`}>
              <h2>{stats?.resources ?? 0}</h2>
              <p>Resource Types</p>
            </div>
            <div className={`${styles.card} ${styles.statCard}`}>
              <h2>{stats?.distributions ?? 0}</h2>`
              <p>Items Distributed</p>
            </div>
          </>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Student Management</h2>
      <div className={styles.grid}>
        <Link href="/admin/enroll-student" className={`${styles.linkCard} ${styles.green}`}>
          <FaUserPlus size={24} />
          <h3>Enroll New Student</h3>
          <p>Add a new student to the school records.</p>
        </Link>
        <Link href="/admin/promote-students" className={`${styles.linkCard} ${styles.purple}`}>
          <FaUsersCog size={24} />
          <h3>Promote Existing Students</h3>
          <p>Upgrade students to the next class for the new year.</p>
        </Link>
      </div>

      <h2 className={styles.sectionTitle}>School Management</h2>
      <div className={styles.grid}>
        <Link href="/admin/manage-teachers" className={`${styles.linkCard} ${styles.blue}`}>
          <FaChalkboardTeacher size={24} />
          <h3>Manage Teachers</h3>
          <p>Add, edit, or remove teacher accounts.</p>
        </Link>
        <Link href="/admin/govt-resources" className={`${styles.linkCard} ${styles.green}`}>
          <FaLandmark size={24} />
          <h3>Govt. Resources</h3>
          <p>Manage inventory from government schemes.</p>
        </Link>
        <Link href="/shared/reports" className={`${styles.linkCard} ${styles.orange}`}>
          <FaChartBar size={24} />
          <h3>View Full Reports</h3>
          <p>Generate detailed attendance and resource reports.</p>
        </Link>
      </div>
    </div>
  );
}

export default withRoleGuard(['admin'])(AdminDashboard);