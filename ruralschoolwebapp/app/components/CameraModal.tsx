// app/components/CameraModal.tsx
'use client';
import React, { useRef, useEffect, useState } from 'react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setStream(stream);
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          alert("Could not access the camera. Please check permissions.");
          onClose();
        });
    } else {
      // Cleanup: stop the camera stream when the modal is closed
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    // Cleanup function to run when the component unmounts
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [isOpen]); // Only re-run the effect if isOpen changes

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <video ref={videoRef} autoPlay playsInline style={styles.video} />
        <div style={styles.controls}>
          <button onClick={onCapture} style={styles.captureButton}>Capture</button>
          <button onClick={onClose} style={styles.closeButton}>Close</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '600px' },
  video: { width: '100%', borderRadius: '8px' },
  controls: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' },
  captureButton: { padding: '10px 20px', fontSize: '1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  closeButton: { padding: '10px 20px', fontSize: '1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default CameraModal;