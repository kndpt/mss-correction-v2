'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings/context';
import GoogleReviewList, { Review } from 'src/components/google-review-list/google-review-list';

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
      <GoogleReviewList reviews={reviews} user_ratings_total={user_ratings_total} rating={rating} />
      <HomeSimulator />
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
