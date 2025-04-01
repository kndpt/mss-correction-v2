/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Correction de livre à petit prix - Relecture et amélioration par une professionnelle',
  description: `Correctrice professionnelle, je vous aide à corriger et embellir votre livre avec rigueur et passion. Estimez le tarif en ligne et confiez-moi votre manuscrit pour une relecture de qualité.`,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
