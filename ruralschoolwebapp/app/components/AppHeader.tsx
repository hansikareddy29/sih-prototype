// app/components/AppHeader.tsx
'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa'; // Import the settings icon


export default function AppHeader() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header style={styles.header}>
      <Link href="/" style={styles.logo}>Rural School App</Link>
      <nav style={styles.nav}>
        {user && <span style={styles.userInfo}>Welcome, {user.name} ({user.role})</span>}
        <Link href="/shared/settings" title="Settings" style={styles.settingsIcon}><FaCog size={20} /></Link>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </nav>
    </header>
  );
}


const styles: { [key: string]: React.CSSProperties } = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' },
  logo: { fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none', color: '#000' },
  nav: { display: 'flex', alignItems: 'center', gap: '1rem' },
  userInfo: { color: '#555' },
  button: { padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  settingsIcon: { color: '#6b7280', display: 'flex', alignItems: 'center' },
};