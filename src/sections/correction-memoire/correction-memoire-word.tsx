import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionMemoireWord() {
  const mdUp = useResponsive('up', 'md');

  const renderDescription = (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Suivi des modifications
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',

            mt: {
              xs: 5,
              md: 0,
            },
          }}
        >
          Avec le suivi des modifications, visualisez chaque amélioration de votre texte. Cette
          approche transparente vous permet de comprendre et d&apos;apprendre de chaque changement,
          assurant que votre mémoire reflète au mieux votre dur travail et votre dévouement
        </Typography>

        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',

            mt: {
              xs: 5,
              md: 0,
            },
          }}
        >
          Le suivi des modifications dans votre mémoire de fin d&apos;études est essentiel pour une
          révision efficace et une amélioration continue. Grâce à cette fonctionnalité, bénéficiez
          d&apos;un aperçu détaillé des corrections apportées à votre texte académique. Adoptez le
          suivi des modifications pour une mémoire sans faille et une présentation irréprochable.
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inUp}>{renderDescription}</m.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inUp}>
            <Image
              disabledEffect
              alt="rocket"
              src="/assets/images/home/memoire-file.png"
              width={mdUp ? 450 : 300}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
