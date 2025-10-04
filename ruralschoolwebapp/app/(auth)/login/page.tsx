// app/(auth)/login/page.tsx
'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import styles from './Login.module.css';
import { FaBookReader, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('login-background');
    return () => {
      document.body.classList.remove('login-background');
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) router.push('/');
    else alert('Login Failed');
  };

  const handleDemoLogin = (user: string) => {
    login(user, 'password').then(success => {
        if (success) router.push('/');
    });
  }

  return (
     <>
      <AnimatedBackground />
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
            <FaBookReader size={40} color="#fff" />
            <h1>Rural School Management</h1>
            <p>Digital attendance and resource tracking for rural schools</p>
        </div>
        <div className={styles.loginCard}>
          <h2>Welcome Back</h2>
          <p>Sign in to access the school management system</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={styles.demoCard}>
            <h3>Demo Accounts</h3>
            <p>Use these credentials to explore the app (password: "password")</p>
            <div className={styles.account} onClick={() => handleDemoLogin('admin')}>
                <FaChalkboardTeacher size={24} />
                <div><strong>admin</strong><br/><span>Administrator</span></div>
                <button>Use</button>
            </div>
            <div className={styles.account} onClick={() => handleDemoLogin('teacher1')}>
                <FaChalkboardTeacher size={24} />
                <div><strong>teacher1</strong><br/><span>Teacher (Class 5)</span></div>
                <button>Use</button>
            </div>
            <div className={styles.account} onClick={() => handleDemoLogin('student1')}>
                <FaUserGraduate size={24} />
                <div><strong>student1</strong><br/><span>Student</span></div>
                <button>Use</button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}