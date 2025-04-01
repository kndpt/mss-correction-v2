'use client';

import Script from 'next/script';
import { m } from 'framer-motion';

import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings/context';
import { Review } from 'src/components/google-review-list/google-review-list';

import HomeChat from '../home/home-chat';
import HomePrivacy from '../home/home-privacy';
import HomeTimeline from '../home/home-timeline';
import HomeSimulator from '../home/home-simulator';
import CorrectionLivreFaq from './correction-livre-faq';
import { CorrectionLivreItem } from './correction-livre-item';
import CorrectionLivreHeroV2 from './correction-livre-hero-v2';
import CorrectionLivreBefenits from './correction-livre-benefits';
import { CorrectionLivreWhoIAm } from './correction-livre-who-i-am';
import CorrectionLivreDescription from './correction-livre-description';
import CorrectionLivreHowItWorks from './correction-livre-how-it-works';
import CorrectionLivreCallToAction from './correction-livre-calltoaction';
import CorrectionLivreBeautification from './correction-livre-beautification';

// ----------------------------------------------------------------------

interface CorrectionLivreViewProps {
  reviews: Review[];
  user_ratings_total: number;
  rating: number;
}

export default function CorrectionLivreView({
  reviews,
  user_ratings_total,
  rating,
}: CorrectionLivreViewProps) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionLivreHeroV2 />
      <Box
        component={MotionViewport}
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        <div id="shapo-widget-50e3a465ba788b5b3a0e" />
        <Script
          id="shapo-embed-js"
          type="text/javascript"
          src="https://cdn.shapo.io/js/embed.js"
          defer
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
          <m.div variants={varFade().inDown}>
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
          </m.div>
        </Box>
      </Box>
      {/* <GoogleReviewList reviews={reviews} user_ratings_total={user_ratings_total} rating={rating} /> */}

      <HomeSimulator />
      <CorrectionLivreWhoIAm />
      {/* <HomeReview /> */}
      <CorrectionLivreBefenits />
      <CorrectionLivreDescription />
      <CorrectionLivreBeautification />
      <CorrectionLivreItem />
      <CorrectionLivreFaq />
      <CorrectionLivreCallToAction />
      <CorrectionLivreHowItWorks />
      <HomeChat />
      <HomePrivacy />
      <HomeTimeline />
    </Container>
  );
}
