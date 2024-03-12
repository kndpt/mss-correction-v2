'use client';

import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Tarifs de correction - Mss Correction',
  description: `Découvrez mes tarifs de correction de texte, pour les particuliers et les entreprises. Des services de qualité, adaptés à vos besoins.`,
};

export default function Layout({ children }: Props) {
  return <AuthModernCompactLayout>{children}</AuthModernCompactLayout>;
}
