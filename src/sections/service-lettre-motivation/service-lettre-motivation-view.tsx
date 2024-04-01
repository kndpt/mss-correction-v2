'use client';

import { m } from 'framer-motion';

import { Stack, Container, Typography } from '@mui/material';

import { ServiceProvider } from 'src/providers/service/service-provider';
import { FirebaseStorageProvider } from 'src/storage/providers/storage-provider';

import { varFade } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

import ServiceStepper from './service-lettre-motivation-stepper';

// ----------------------------------------------------------------------

export default function ServiceLettreMotivationView() {
  const settings = useSettingsContext();
  return (
    <ServiceProvider>
      <FirebaseStorageProvider>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mt: 6,
            mb: 8,
            mx: {
              xs: 1,
              sm: 3,
              md: 5,
              lg: 10,
              xl: 20,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Correction et embellissement
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography variant="h1" sx={{ fontSize: '36px!important' }}>
               Lettre de motivation
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography
              variant="h2"
              sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '14px!important' }}
            >
              Des étapes simples pour une correction professionnelle.
            </Typography>
          </m.div>
        </Stack>

        <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
          <ServiceStepper />
        </Container>
      </FirebaseStorageProvider>
    </ServiceProvider>
  );
}
