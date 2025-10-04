// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Simple layout for pages that don't need the main AppHeader
  return <>{children}</>;
}