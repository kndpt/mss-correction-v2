/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Correction de manuscrit abordable - Relecture par une pro',
  description: `Correctrice freelance, je corrige et sublime votre manuscrit avec rigueur. Obtenez un texte fluide et sans fautes. Estimez votre tarif en ligne en 1 clic.`,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
