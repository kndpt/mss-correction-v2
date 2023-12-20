import MainLayout from 'src/layouts/main';

import TarifsView from 'src/sections/tarifs/tarifs-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Simulateur de correction - Mss Correction',
};

export default function TarifsPage() {
  return (
    <MainLayout hasFooter={false}>
      <TarifsView />
    </MainLayout>
  );
}
