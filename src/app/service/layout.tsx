import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Service de correction de texte - Mss Correction',
};

export default function Layout({ children }: Props) {
  return <MainLayout hasFooter={false}>{children}</MainLayout>;
}
