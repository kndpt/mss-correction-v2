import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionMemoireHero() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.tarifs}
    >
      Simuler la correction de mon mémoire
    </Button>
  );

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
          Correction de mémoire de fin d&apos;études
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
          Réussissez votre mémoire de fin d&apos;études avec brio grâce à une correction
          professionnelle. Je corrige les erreurs, améliore la clarté et la cohérence, et assure que
          votre travail soit prêt à impressionner. Réussissez en toute confiance !
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}> {renderBtn} </m.div>
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
          <m.div variants={varFade().inUp}>
            <Image
              disabledEffect
              alt="rocket"
              src="/assets/images/home/character-work.webp"
              width={mdUp ? 450 : 300}
            />
          </m.div>
        </Grid>
        <Grid item xs={12} md={6}>
          {renderDescription}
        </Grid>
      </Grid>
    </Container>
  );
}
