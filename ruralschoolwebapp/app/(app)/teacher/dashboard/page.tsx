// 'use client';
// import { useState, useEffect } from 'react';
// import withRoleGuard from '../../../components/withRoleGuard';
// import Link from 'next/link';
// import styles from '../../Dashboard.module.css';
// import { FaUsers, FaTasks, FaBoxOpen, FaChartLine, FaPlus, FaFolderOpen } from 'react-icons/fa';
// import api from '../../../api/axios';
// import CameraModal from '../../../components/CameraModal';

// // Define a type for your attendance record
// interface AttendanceRecord {
//   studentId: string;
//   studentName: string;
//   date: string;
//   time: string;
//   status: 'Present' | 'Absent'; // Or 'Marked', 'Unmarked' etc.
// }

// // Define a type for student data (matching what your /students endpoint returns)
// interface Student {
//   studentId: string;
//   name: string;
//   class: string;
//   section: string;
//   // Add other student properties if available from your API
// }

// function TeacherDashboard() {
//   const [stats, setStats] = useState({ totalStudents: 0, todaysAttendance: 0, resourcesDistributed: 0, syncStatus: 'syncing' });
//   const [isCameraOpen, setCameraOpen] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]); // To store the list of students
//   const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]); // To store attendance after capture
//   const [showAttendanceList, setShowAttendanceList] = useState(false); // To control visibility of the list

//   useEffect(() => {
//     // Fetch dashboard stats
//     api.get('/stats/teacher/teacher-01')
//       .then(res => setStats(res.data))
//       .catch(error => console.error("Error fetching teacher stats:", error));

//     // Fetch the list of all students (assuming your /students endpoint provides this)
//     api.get('/students')
//       .then(res => setStudents(res.data))
//       .catch(error => console.error("Error fetching students:", error));
//   }, []);

//   const handleCapture = () => {
//     // This is where you'd typically process the captured image
//     // to identify students and their presence/absence.
//     // For this simulation, we'll mark all fetched students as 'Present'.

//     const now = new Date();
//     const date = now.toLocaleDateString(); // e.g., "7/23/2024"
//     const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., "10:30 AM"

//     const newAttendanceRecords: AttendanceRecord[] = students.map(student => ({
//       studentId: student.studentId,
//       studentName: student.name,
//       date: date,
//       time: time,
//       status: 'Present', // Defaulting to 'Present' for simulation
//     }));

//     setAttendanceRecords(newAttendanceRecords);
//     setShowAttendanceList(true); // Show the attendance list
//     setCameraOpen(false); // Close the camera modal
//     alert("Attendance Marked (Simulated). See list below.");
//   };

//   return (
//     <>
//       <CameraModal isOpen={isCameraOpen} onClose={() => setCameraOpen(false)} onCapture={handleCapture} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Teacher Dashboard</h1>
//         <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>

//         {/* STATS CARDS */}
//         <div className={styles.grid}>
//           <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.totalStudents}</h2><p>Enrolled Students</p></div>
//           <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.todaysAttendance}</h2><p>Students Marked Today</p></div>
//           <div className={`${styles.card} ${styles.statCard}`}><h2>{stats.resourcesDistributed}</h2><p>Items Distributed</p></div>
//           <div className={`${styles.card} ${styles.statCard}`}><h2>✓</h2><p>All Synced</p></div>
//         </div>

//         <h2 className={styles.sectionTitle}>Quick Actions</h2>
//         <div className={styles.grid}>
//           <div className={`${styles.linkCard} ${styles.green}`} onClick={() => setCameraOpen(true)}>
//             <FaTasks size={24} /><h3>Take Attendance</h3><p>Upload group photos.</p>
//           </div>
//           <Link href="/teacher/distribute" className={`${styles.linkCard} ${styles.blue}`}>
//             <FaBoxOpen size={24} /><h3>Distribute Resources</h3><p>Record resource distribution.</p>
//           </Link>
//           <Link href="/shared/reports" className={`${styles.linkCard} ${styles.orange}`}>
//             <FaChartLine size={24} /><h3>View Reports</h3><p>Check attendance reports.</p>
//           </Link>
//           <Link href="/teacher/manage-students" className={`${styles.linkCard} ${styles.purple}`}>
//             <FaUsers size={24} />
//             <h3>Manage Students</h3>
//             <p>Add or edit student information.</p>
//           </Link>
//         </div>

//         {/* --- ATTENDANCE LIST SECTION --- */}
//         {showAttendanceList && (
//           <div className={styles.attendanceListSection}>
//             <h2 className={styles.sectionTitle}>Today's Attendance Records</h2>
//             {attendanceRecords.length > 0 ? (
//               <table className={styles.attendanceTable}>
//                 <thead>
//                   <tr>
//                     <th>Student Name</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {attendanceRecords.map((record) => (
//                     // Use studentId as key for stability - MOVED COMMENT OUTSIDE
//                     <tr key={record.studentId}>
//                       <td>{record.studentName}</td>
//                       <td>{record.date}</td>
//                       <td>{record.time}</td>
//                       <td>{record.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No students found or attendance recorded.</p>
//             )}
//             <button
//               onClick={() => {
//                 setShowAttendanceList(false);
//                 setAttendanceRecords([]); // Clear records when hiding
//               }}
//               className={styles.hideButton}
//             >
//               Hide Attendance List
//             </button>
//           </div>
//         )}
//         {/* --- END ATTENDANCE LIST SECTION --- */}

//       </div>
//     </>
//   );
// }
// export default withRoleGuard(['teacher'])(TeacherDashboard);

'use client';
import { useState, useEffect } from 'react';
import withRoleGuard from '../../../components/withRoleGuard';
import Link from 'next/link';
import styles from '../../Dashboard.module.css';
import { FaUsers, FaTasks, FaBoxOpen, FaChartLine, FaPlus, FaFolderOpen } from 'react-icons/fa';
import api from '../../../api/axios';
import CameraModal from '../../../components/CameraModal';

// Define a type for your attendance record
interface AttendanceRecord {
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  status: 'Present' | 'Absent'; // Or 'Marked', 'Unmarked' etc.
}

// Define a type for student data (matching what your /students endpoint returns)
interface Student {
  studentId: string;
  name: string;
  class: string;
  section: string;
  // Add other student properties if available from your API
}

function TeacherDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, todaysAttendance: 0, resourcesDistributed: 0, syncStatus: 'syncing' });
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]); // To store the list of students
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]); // To store attendance after capture
  const [showAttendanceList, setShowAttendanceList] = useState(false); // To control visibility of the list

  useEffect(() => {
    // Fetch dashboard stats
    api.get('/stats/teacher/teacher-01')
      .then(res => setStats(res.data))
      .catch(error => console.error("Error fetching teacher stats:", error));

    // Fetch the list of all students (assuming your /students endpoint provides this)
    api.get('/students')
      .then(res => setStudents(res.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const handleCapture = () => {
    // This is where you'd typically process the captured image
    // to identify students and their presence/absence.
    // For this simulation, we'll mark all fetched students as 'Present'.

    const now = new Date();
    const date = now.toLocaleDateString(); // e.g., "7/23/2024"
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., "10:30 AM"

    // Only generate records if there are students
    const newAttendanceRecords: AttendanceRecord[] = students.length > 0
      ? students.map(student => ({
          studentId: student.studentId,
          studentName: student.name,
          date: date,
          time: time,
          status: 'Present', // Defaulting to 'Present' for simulation
        }))
      : []; // If no students, return an empty array

    setAttendanceRecords(newAttendanceRecords);
    setShowAttendanceList(true); // Show the attendance list
    setCameraOpen(false); // Close the camera modal
    alert("Attendance Marked (Simulated). See list below.");
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
          <div className={`${styles.linkCard} ${styles.green}`} onClick={() => {
            setCameraOpen(true);
            // Optionally, clear previous attendance list when opening camera
            // setAttendanceRecords([]);
            // setShowAttendanceList(false);
          }}>
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

        {/* --- ATTENDANCE LIST SECTION --- */}
        {showAttendanceList && (
          <div className={styles.attendanceListSection}>
            <h2 className={styles.sectionTitle}>Today's Attendance Records</h2>
            <table className={styles.attendanceTable}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((record) => (
                    <tr key={record.studentId}>
                      <td>{record.studentName}</td>
                      <td>{record.date}</td>
                      <td>{record.time}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className={styles.noRecordsMessage}>
                      No attendance records found for today or no students are enrolled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={() => {
                setShowAttendanceList(false);
                setAttendanceRecords([]); // Clear records when hiding
              }}
              className={styles.hideButton}
            >
              Hide Attendance List
            </button>
          </div>
        )}
        {/* --- END ATTENDANCE LIST SECTION --- */}

      </div>
    </>
  );
}
export default withRoleGuard(['teacher'])(TeacherDashboard);