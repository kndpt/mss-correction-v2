'use client';

import { Container } from '@mui/material';

import { ServiceProvider } from 'src/providers/service/service-provider';
import { FirebaseStorageProvider } from 'src/storage/providers/storage-provider';

import { useSettingsContext } from 'src/components/settings';

import ServiceStepper from './service-stepper';

// ----------------------------------------------------------------------

export default function ServiceView() {
  const settings = useSettingsContext();
  return (
    <ServiceProvider>
      <FirebaseStorageProvider>
        <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
          <ServiceStepper />
        </Container>

        {/* <Simulator isCommand /> */}
      </FirebaseStorageProvider>
    </ServiceProvider>
  );
}
