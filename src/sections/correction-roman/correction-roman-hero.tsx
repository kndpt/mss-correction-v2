import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';
import CurrentBalance from 'src/components/current-balance/current-balance';

// ----------------------------------------------------------------------

export default function CorrectionRomanHero() {
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'start' }}>
      <m.div variants={varFade().inLeft}>
        <CurrentBalance title="Prix de la correction par mot" />
      </m.div>
    </Stack>
  );

  const renderContent = (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <Image
        disabledEffect
        alt="grid"
        src="/assets/images/correction-roman/correction-roman-illustration.png"
      />
    </Box>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="h4">Correction de roman</Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
          Avec des tarifs avantageux pour la correction de votre livre
        </Typography>
        {/* <PenIconAnimated />
        <MagnifyingGlassIconAnimated /> */}
      </m.div>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={{ md: 0 }}
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inRight}>{renderContent}</m.div>
        </Grid>

        <Grid item xs={12} md={6}>
          {renderDescription}
        </Grid>
      </Grid>
    </Container>
  );
}
