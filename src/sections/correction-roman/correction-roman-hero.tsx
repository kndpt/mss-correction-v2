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
        <Typography variant="h2">Donnez vie à votre roman</Typography>
      </m.div>

      <m.div variants={varFade().inLeft}>
        <CurrentBalance title=" Service de correction de roman" />
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
        <Typography
          component="h1"
          variant="overline"
          sx={{
            color: 'text.disabled',
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Correction de Roman
        </Typography>
      </m.div>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={{ md: 0 }}
        sx={{ mt: 4 }}
      >
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inRight}>{renderContent}</m.div>
        </Grid>

        <Grid xs={12} md={6}>
          {renderDescription}
        </Grid>
      </Grid>
    </Container>
  );
}
