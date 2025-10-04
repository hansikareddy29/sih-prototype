// app/(app)/teacher/attendance/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';

function TakeAttendancePage() {
  const handleOpenCamera = () => {
    alert("This would open the device camera to take a class photo.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mark Attendance</h1>
      <p className={styles.subtitle}>Select a class and take a photo to automatically mark attendance.</p>
      
      <div className={styles.card} style={{ maxWidth: '500px' }}>
        <h3>Class Selection</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label htmlFor="class-select">Choose your class:</label>
          <select id="class-select" style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="5A">Class 5 - Section A</option>
            <option value="6B">Class 6 - Section B</option>
          </select>
          
          <button onClick={handleOpenCamera} style={{ padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
            Open Camera & Take Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(['teacher'])(TakeAttendancePage);