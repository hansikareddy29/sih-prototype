// app/components/ProgressBar.tsx
'use client';

interface ProgressBarProps {
  total: number;
  consumed: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, consumed, color }) => {
  const percentage = total > 0 ? (consumed / total) * 100 : 0;

  return (
    <div style={styles.container}>
      <div style={{...styles.bar, width: `${percentage}%`, backgroundColor: color}} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease-in-out',
  },
};

export default ProgressBar;