'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import { IPostItem } from 'src/types/blog';

import HomeFaqs from '../home-faq';
import HomeHero from '../home-hero';
import HomeChat from '../home-chat';
import HomeBlog from '../home-blog';
import HomePricing from '../home-pricing';
import HomePrivacy from '../home-privacy';
import HomeTimeline from '../home-timeline';
import HomeDocuments from '../home-documents';
import HomeSimulator from '../home-simulator';
import HomeLastPosts from '../home-last-posts';
import HomeEntreprise from '../home-entreprise';
import HomeHowItWorks from '../home-how-it-works';
import HomeAdvertisement from '../home-advertisement';
import HomeSocialNetworks from '../home-social-networks';

// ----------------------------------------------------------------------

interface Props {
  posts: IPostItem[];
}

export default function HomeView(props: Props) {
  const { scrollYProgress } = useScroll();

  const { posts } = props;

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

        <HomeBlog />

        <HomeLastPosts posts={posts} />

        <HomeChat />

        <HomePrivacy />

        <HomeTimeline />

        <HomeAdvertisement />
      </Box>
    </MainLayout>
  );
}
