'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings/context';

import HomeFaqs from '../home/home-faq';
import HomeChat from '../home/home-chat';
import HomePrivacy from '../home/home-privacy';
import HomeTimeline from '../home/home-timeline';
import HomeBefenits from '../home/home-benefits';
import HomeSimulator from '../home/home-simulator';
import HomeHowItWorks from '../home/home-how-it-works';
import CorrectionRomanHero from './correction-roman-hero';
import HomeBeautification from '../home/home-beautification';
import HomeSocialNetworks from '../home/home-social-networks';
import CorrectionRomanDescription from './correction-roman-description';
import CorrectionRomanCallToAction from './correction-roman-calltoaction';

// ----------------------------------------------------------------------

export default function CorrectionRomanView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionRomanHero />
      <CorrectionRomanDescription />
      <HomeBeautification />
      <HomeBefenits />
      <CorrectionRomanCallToAction />
      <HomeHowItWorks />
      <HomeSimulator />
      <HomeFaqs />
      <HomeSocialNetworks />
      <HomeChat />
      <HomePrivacy />
      <HomeTimeline />
    </Container>
  );
}
