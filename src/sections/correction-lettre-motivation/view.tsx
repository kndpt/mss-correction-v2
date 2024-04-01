'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings/context';

import CorrectionLettreMotivationBenefits from './correction-lettre-benefits';
import CorrectionLettreMotivationHero from './correction-lettre-motivation-hero';
import CorrectionLettreMotivationHowItWorks from './correction-lettre-how-it-works';
import CorrectionLettreMotivationService from './correction-lettre-motivation-service';
import CorrectionLettreMotivationQuestion from './correction-lettre-motivation-question';
import { CorrectionLettreMotivationEnjeux } from './correction-lettre-motivation-enjeux';
import { CorrectionLettreMotivationDemarquation } from './correction-lettre-demarquation';

// ----------------------------------------------------------------------

export default function CorrectionLettreMotivationView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionLettreMotivationHero />
      <CorrectionLettreMotivationEnjeux />
      <CorrectionLettreMotivationDemarquation description="Savais-tu que ta lettre de motivation peut te faire sortir du lot ? Oui, c'est vrai ! Avec les bons mots et un petit coup de pouce de ma part, on peut rendre ta lettre super convaincante. Laisse-moi t'aider à te démarquer. On y va ?" />
      <CorrectionLettreMotivationService />
      <CorrectionLettreMotivationBenefits />
      <CorrectionLettreMotivationHowItWorks />
      <CorrectionLettreMotivationQuestion />
    </Container>
  );
}
