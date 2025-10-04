'use client';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from '../../Dashboard.module.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
responsive: true,
plugins: {
legend: { position: 'top' as const },
title: { display: true, text: 'Attendance Rate by Class' },
},
};

const labels = ['Class 5A', 'Class 5B', 'Class 6A', 'Class 6B', 'Class 6C'];
export const data = {
labels,
datasets: [
{
label: 'Present Students (Avg)',
data: labels.map(() => Math.floor(Math.random() * 30) + 10),
backgroundColor: 'rgba(59, 130, 246, 0.7)',
},
{
label: 'Absent Students (Avg)',
data: labels.map(() => Math.floor(Math.random() * 5) + 1),
backgroundColor: 'rgba(239, 68, 68, 0.7)',
},
],
};

function ReportsPage() {
return (
<div className={styles.container}>
<h1 className={styles.title}>School Reports</h1>
<p className={styles.subtitle}>Visual overview of key school metrics.</p>
<div className={styles.card}>
<Bar options={options} data={data} />
</div>
</div>
)
}

export default ReportsPage;