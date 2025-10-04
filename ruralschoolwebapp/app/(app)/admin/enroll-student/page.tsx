// app/(app)/admin/enroll-student/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css';

function EnrollStudentPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Student Enrollment Submitted (Simulated).");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enroll New Student</h1>
      <p className={styles.subtitle}>Fill in the details below to add a new student.</p>

      <form onSubmit={handleSubmit} className={styles.card} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Full Name</label>
          <input type="text" required style={inputStyle} />
        </div>
        <div>
          <label>Class</label>
          <input type="text" required style={inputStyle} />
        </div>
        <div>
          <label>Section</label>
          <input type="text" required style={inputStyle} />
        </div>
        <div>
          <label>Upload Student Photos (for Facial Recognition)</label>
          <input type="file" multiple accept="image/*" style={{...inputStyle, padding: '0.5rem'}} />
        </div>
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Enroll Student
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  marginTop: '0.25rem'
};

export default withRoleGuard(['admin'])(EnrollStudentPage);