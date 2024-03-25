/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Services Professionnels de Correction de Texte pour Entreprises - Mss Correction',
  description: `Découvrez mes services de correction de texte haut de gamme, spécialement conçus pour les besoins des entreprises. Précision, qualité et confidentialité garanties.`,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
