'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings/context';

import CorrectionHowItWorks from './correction-how-it-works';
import CorrectionFreelanceHero from './correction-entreprise-hero';
import CorrectionEntreprisePrivacy from './correction-entreprise-privacy';
import CorrectionEntrepriseBenefits from './correction-entreprise-benefits';
import CorrectionEntrepriseDocuments from './correction-entreprise-documents';
import CorrectionEntrepriseEntreprise from './correction-entreprise-information';
import CorrectionEntrepriseCallToAction from './correction-entreprise-calltoaction';

// ----------------------------------------------------------------------

export default function CorrectionEntrepriseView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionFreelanceHero />
      <CorrectionEntrepriseEntreprise />
      <CorrectionEntrepriseBenefits />
      <CorrectionEntrepriseDocuments />
      <CorrectionEntreprisePrivacy />
      <CorrectionHowItWorks />
      {/* <HomeFaqs /> */}
      <CorrectionEntrepriseCallToAction />
    </Container>
  );
}
