'use client';

import Script from 'next/script';

import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings/context';
import { Review } from 'src/components/google-review-list/google-review-list';

import HomeChat from '../home/home-chat';
import HomeReview from '../home/home-review';
import HomePrivacy from '../home/home-privacy';
import HomeTimeline from '../home/home-timeline';
import HomeSimulator from '../home/home-simulator';
import CorrectionRomanFaq from './correction-roman-faq';
import HomeBeautification from '../home/home-beautification';
import { CorrectionRomanItem } from './correction-roman-item';
import CorrectionRomanHeroV2 from './correction-roman-hero-v2';
import CorrectionRomanBefenits from './correction-roman-benefits';
import CorrectionRomanDescription from './correction-roman-description';
import CorrectionRomanHowItWorks from './correction-roman-how-it-works';
import CorrectionRomanCallToAction from './correction-roman-calltoaction';
import { CorrectionMemoireWhoIAm } from '../correction-memoire/correction-memoire-who-i-am';

// ----------------------------------------------------------------------

interface CorrectionRomanViewProps {
  reviews: Review[];
  user_ratings_total: number;
  rating: number;
}

export default function CorrectionRomanView({
  reviews,
  user_ratings_total,
  rating,
}: CorrectionRomanViewProps) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionRomanHeroV2 />
      <div id="shapo-widget-50e3a465ba788b5b3a0e" />
      <Script
        id="shapo-embed-js"
        type="text/javascript"
        src="https://cdn.shapo.io/js/embed.js"
        defer
      />
      {/* <GoogleReviewList reviews={reviews} user_ratings_total={user_ratings_total} rating={rating} /> */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          href="https://shapo.io/wall-of-love/f7e1e85125"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          target="_blank"
          sx={{ px: 6 }}
        >
          Wall of Love
        </Button>
      </Box>
      <HomeSimulator />
      <CorrectionMemoireWhoIAm
        description="Je m'appelle Océane, je suis correctrice en freelance depuis trois ans déjà. Depuis petite, l'écriture a toujours été ma passion première. C'était comme une évidence pour moi de lire vos écrits et les corriger !
        Aujourd'hui, je mets toute mon expertise et ma passion à votre service. Que ce soit pour corriger vos documents professionnels, vos mémoires d'étudiants ou vos romans en devenir, je suis là pour vous aider à atteindre la perfection.
        N'hésitez pas à me contacter pour discuter de votre projet. Ensemble, faisons de vos écrits des chefs-d'œuvre impeccables !"
      />
      <HomeReview />
      <CorrectionRomanBefenits />
      <CorrectionRomanDescription />
      <HomeBeautification />
      <CorrectionRomanItem description="Choisir mes services, c'est opter pour un partenaire de confiance qui comprend l'importance de chaque mot dans la narration de votre histoire. Mon service de relecture spécialisé dans les livres garantit que chaque page de votre roman reflète votre vision avec clarté et précision." />
      <CorrectionRomanFaq />
      <CorrectionRomanCallToAction />
      <CorrectionRomanHowItWorks />
      <HomeChat />
      <HomePrivacy />
      <HomeTimeline />
    </Container>
  );
}
