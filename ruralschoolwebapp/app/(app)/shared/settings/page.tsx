// app/(app)/shared/settings/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../../Dashboard.module.css';

function SettingsPage() {
  const { user } = useContext(AuthContext);
  // Pre-fill form with current user data
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [className, setClassName] = useState('Class 5 - Section A'); // Mock data

  const handleSave = () => {
    // In a real app, this would make an API call
    alert(`Settings saved! (Simulated)\nNew Name: ${displayName}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>Manage your profile and application settings.</p>

      <div className={styles.card} style={{ maxWidth: '600px' }}>
        <h3>Profile Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label htmlFor="displayName" style={{ fontWeight: 500 }}>Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '0.25rem' }}
            />
          </div>

          {user?.role === 'student' && (
            <div>
              <label htmlFor="className" style={{ fontWeight: 500 }}>Class</label>
              <input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '0.25rem' }}
              />
            </div>
          )}
          
          <button 
            onClick={handleSave}
            style={{ padding: '0.75rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Allow all authenticated roles to access this page
export default withRoleGuard(['admin', 'teacher', 'student'])(SettingsPage);