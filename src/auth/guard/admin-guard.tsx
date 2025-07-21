'use client';

import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import useIsAdmin from '../hooks/use-is-admin';

// ----------------------------------------------------------------------

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard/order'); // Rediriger vers une page accessible aux utilisateurs normaux
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null; // Ou un composant de loading/403
  }

  return children;
}
