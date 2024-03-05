'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import HomeFaqs from '../home-faq';
import HomeHero from '../home-hero';
import HomeChat from '../home-chat';
import HomePricing from '../home-pricing';
import HomePrivacy from '../home-privacy';
import HomeTimeline from '../home-timeline';
import HomeDocuments from '../home-documents';
import HomeSimulator from '../home-simulator';
import HomeEntreprise from '../home-entreprise';
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

        <HomeEntreprise />

        {/* <HomeAnalytics /> */}

        <HomeHowItWorks />

        <HomeSimulator />

        <HomePricing />

        <HomeFaqs />

        <HomeSocialNetworks />

        <HomeChat />

        <HomePrivacy />

        <HomeTimeline />

        <HomeAdvertisement />
      </Box>
    </MainLayout>
  );
}
