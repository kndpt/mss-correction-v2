import { Metadata } from 'next';

import { FreeSamplesListView } from 'src/sections/free-samples/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Échantillons gratuits - MSS Correction',
  description: 'Gestion des échantillons de correction gratuits soumis par les clients.',
};

export default function FreeSamplesListPage() {
  return <FreeSamplesListView />;
}
