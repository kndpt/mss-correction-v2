'use client';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { FirebaseStorageProvider } from 'src/storage/providers/storage-provider';
import { FirestorePostsProvider } from 'src/firestore/providers/posts/posts-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <FirebaseStorageProvider>
        <FirestorePostsProvider isAdmin>
          <DashboardLayout>{children}</DashboardLayout>
        </FirestorePostsProvider>
      </FirebaseStorageProvider>
    </AuthGuard>
  );
}
