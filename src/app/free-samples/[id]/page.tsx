import { Metadata } from 'next';

import Box from '@mui/system/Box';

import { FirestoreFreeSampleProvider } from 'src/firestore/providers/free-samples/free-sample-provider';

import FreeSampleDetailsView from 'src/sections/free-samples/view/free-sample-details-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Correction d'extrait gratuite - MSS Correction",
  description:
    'Visualisez la correction gratuite de votre extrait de texte réalisée par MSS Correction.',
};

type Props = {
  params: {
    id: string;
  };
};

export default function FreeSampleDetailsPage({ params }: Props) {
  const { id } = params;

  return (
    <FirestoreFreeSampleProvider id={id}>
      <Box sx={{ pt: { xs: 12, md: 16 } }}>
        <FreeSampleDetailsView />
      </Box>
    </FirestoreFreeSampleProvider>
  );
}
