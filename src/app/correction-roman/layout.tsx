/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Tarifs de correction - Mss Correction',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout hasFooter={false}>{children}</MainLayout>;
}
