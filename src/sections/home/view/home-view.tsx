'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import HomeHero from '../home-hero';
import HomeChat from '../home-chat';
import HomePricing from '../home-pricing';
import HomePrivacy from '../home-privacy';
import HomeDocuments from '../home-documents';
import HomeSimulator from '../home-simulator';
import HomeTimeline from '../home-timeline';
import HomeHowItWorks from '../home-how-it-works';
import HomeAdvertisement from '../home-advertisement';
import HomeSocialNetworks from '../home-social-networks';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeDocuments />

        <HomeHowItWorks />

        <HomeSimulator />

        <HomePricing />

        <HomeSocialNetworks />

        <HomeChat />

        <HomePrivacy />

        <HomeTimeline />

        <HomeAdvertisement />
      </Box>
    </MainLayout>
  );
}
