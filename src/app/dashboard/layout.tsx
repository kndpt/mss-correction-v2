'use client';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { FirebaseStorageProvider } from 'src/storage/providers/storage-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <FirebaseStorageProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </FirebaseStorageProvider>
    </AuthGuard>
  );
}
