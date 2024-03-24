'use client';

import dynamic from 'next/dynamic';
import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';

import { IPostItem } from 'src/types/blog';

// Lazy-loaded components:
const HomeFaqs = dynamic(() => import('../home-faq'));
const HomeHero = dynamic(() => import('../home-hero'));
const HomeChat = dynamic(() => import('../home-chat'));
const HomeBlog = dynamic(() => import('../home-blog'));
const HomePricing = dynamic(() => import('../home-pricing'));
const HomePrivacy = dynamic(() => import('../home-privacy'));
const HomeTimeline = dynamic(() => import('../home-timeline'));
const HomeDocuments = dynamic(() => import('../home-documents'));
const HomeSimulator = dynamic(() => import('../home-simulator'));
const HomeLastPosts = dynamic(() => import('../home-last-posts'));
const HomeEntreprise = dynamic(() => import('../home-entreprise'));
const HomeHowItWorks = dynamic(() => import('../home-how-it-works'));
const HomeAdvertisement = dynamic(() => import('../home-advertisement'));
const HomeSocialNetworks = dynamic(() => import('../home-social-networks'));

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
