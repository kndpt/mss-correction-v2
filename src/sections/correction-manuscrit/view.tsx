'use client';

import Script from 'next/script';
import { m } from 'framer-motion';

import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings/context';

import HomeChat from '../home/home-chat';
import HomePrivacy from '../home/home-privacy';
import HomeTimeline from '../home/home-timeline';
import HomeSimulator from '../home/home-simulator';
import CorrectionManuscritFaq from './correction-manuscrit-faq';
import { CorrectionManuscritItem } from './correction-manuscrit-item';
import CorrectionManuscritHeroV2 from './correction-manuscrit-hero-v2';
import CorrectionManuscritBefenits from './correction-manuscrit-benefits';
import { CorrectionManuscritWhoIAm } from './correction-manuscrit-who-i-am';
import CorrectionManuscritDescription from './correction-manuscrit-description';
import CorrectionManuscritHowItWorks from './correction-manuscrit-how-it-works';
import CorrectionManuscritCallToAction from './correction-manuscrit-calltoaction';
import CorrectionManuscritBeautification from './correction-manuscrit-beautification';

// ----------------------------------------------------------------------

export default function CorrectionManuscritView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionManuscritHeroV2 />
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
      <CorrectionManuscritWhoIAm />
      {/* <HomeReview /> */}
      <CorrectionManuscritBefenits />
      <CorrectionManuscritDescription />
      <CorrectionManuscritBeautification />
      <CorrectionManuscritItem />
      <CorrectionManuscritFaq />
      <CorrectionManuscritCallToAction />
      <CorrectionManuscritHowItWorks />
      <HomeChat />
      <HomePrivacy />
      <HomeTimeline />
    </Container>
  );
}
