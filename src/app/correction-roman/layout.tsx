/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Service de relecture et correction de roman à petit prix - Mss Correction',
  description: `Professionnelle en correction de roman, j'offre une relecture précise et un service d'embellissement de texte. Tarifs abordables, simulateur en ligne. Améliorez votre manuscrit avec une experte.`,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
