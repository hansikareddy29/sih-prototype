// app/context/AuthContext.tsx
'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

const MOCK_USERS_DB: { [key: string]: User } = {
  admin: { id: 'admin-01', name: 'Principal Singh', role: 'admin' },
  teacher1: { id: 'teacher-01', name: 'Ms. Geeta Sharma', role: 'teacher' },
  student1: { id: 'student-01', name: 'Rohan Sharma', role: 'student' },
};

const mockApiLogin = async (username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (password === 'password' && MOCK_USERS_DB[username]) {
        resolve({ success: true, user: MOCK_USERS_DB[username] });
      } else {
        resolve({ success: false, error: 'Invalid credentials' });
      }
    }, 500);
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await mockApiLogin(username, password);
    if (response.success && response.user) {
      setUser(response.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};