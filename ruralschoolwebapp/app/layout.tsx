// app/layout.tsx

import './globals.css';
import { Providers } from './providers'; // Import the new Providers component

export const metadata = {
  title: 'Rural School App',
  description: 'Attendance and Resource Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}