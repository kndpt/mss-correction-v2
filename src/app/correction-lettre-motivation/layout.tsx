import 'src/global.css';
// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Correction de lettre de motivation - Mss Correction',
  description: `Boostez l'impact de votre lettre de motivation avec une correction et un embellissement. Mettez toutes les chances de votre côté pour séduire les recruteurs.`};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
