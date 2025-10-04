// app/(app)/teacher/distribute/page.tsx
'use client';

import { useState } from 'react'; // Import useState
import withRoleGuard from '../../../components/withRoleGuard';
import CameraModal from '../../../components/CameraModal'; // Import the CameraModal
import styles from '../../Dashboard.module.css';

function DistributeResourcesPage() {
  // 1. Add state to manage the camera modal
  const [isCameraOpen, setCameraOpen] = useState(false);

  // 2. Create a handler for when a photo is captured
  const handleCapture = () => {
    // Give a more specific alert for this workflow
    alert("Scan Complete (Simulated). The student and resource would now be linked.");
    setCameraOpen(false); // Close the modal after capture
  };

  return (
    <>
      {/* 3. Add the CameraModal component to the page */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCapture}
      />

      <div className={styles.container}>
        <h1 className={styles.title}>Distribute Resources</h1>
        <p className={styles.subtitle}>Scan a student and a resource to complete distribution.</p>
        <div className={styles.card} style={{ maxWidth: '500px' }}>
          {/* 4. Update the button's onClick to open the modal */}
          <button
            onClick={() => setCameraOpen(true)}
            style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Start Scanning
          </button>
        </div>
      </div>
    </>
  );
}

export default withRoleGuard(['teacher'])(DistributeResourcesPage);