// app/components/StatCircle.tsx
'use client';
import React from 'react';

interface StatCircleProps {
  value: number;
  label: string;
  color: string;
}

const StatCircle: React.FC<StatCircleProps> = ({ value, label, color }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: `${color}20`, // semi-transparent background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        border: `4px solid ${color}50`
      }}>
        <span style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: color
        }}>{value}</span>
      </div>
      <p style={{
        fontWeight: 600,
        fontSize: '1rem',
        color: '#4b5563'
      }}>{label}</p>
    </div>
  );
};

export default StatCircle;