import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionEntrepriseHero() {
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Correcteur professionnel
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Pour entreprise</Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h1"
          sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '14px!important' }}
        >
          En tant que correcteur professionnel freelance, je propose un service de
          correction sur mesure pour les entreprises,
          garantissant des documents d&apos;une qualité irréprochable.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Image
        disabledEffect
        alt="grid"
        src="/assets/images/entreprise/illustration_dashboard.png"
        width={450}
      />
    </Box>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      {renderDescription}

      {renderContent}
    </Container>
  );
}
