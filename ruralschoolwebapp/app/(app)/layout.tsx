// app/(app)/layout.tsx
import AppHeader from '../components/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  );
}