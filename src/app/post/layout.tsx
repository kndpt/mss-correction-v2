/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';
import { FirestorePostsProvider } from 'src/firestore/providers/posts/posts-provider';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog - Mss Correction',
  description: `Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de motivation, ou encore un roman.`,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <MainLayout hasFooter={false}>
      <FirestorePostsProvider isAdmin={false}>{children}</FirestorePostsProvider>
    </MainLayout>
  );
}
