// app/providers.tsx

'use client'; // This is the most important line!

import { AuthProvider } from './context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}