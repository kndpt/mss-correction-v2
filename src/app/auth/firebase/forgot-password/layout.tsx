'use client';

import { GuestGuard } from 'src/auth/guard';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthModernCompactLayout>{children}</AuthModernCompactLayout>
    </GuestGuard>
  );
}
