import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      size="large"
      variant="outlined"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.service}
    >
      Commander maintenant
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
          Me confier la correction de votre roman
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
        >
          C&apos;est choisir de s&apos;affranchir des contraintes techniques pour se focaliser sur l&apos;essence
          de votre travail créatif. Mon service de correcteur de livre offre la sérénité d&apos;esprit, en
          sachant que les aspects linguistiques de votre œuvre littéraire sont soigneusement pris en
          charge.
        </Typography>
      </m.div>

      {mdUp && <m.div variants={varFade().inDown}> {renderBtn} </m.div>}
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 10 },
        textAlign: 'center',
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 5, md: 0 }}>
        <Grid xs={12} md={6}>
          {renderDescription}
        </Grid>

        <Grid xs={12} md={6}>
          <m.div variants={varFade().inUp}>
            <Image
              disabledEffect
              alt="rocket"
              src="/assets/images/home/character-work.webp"
              width={mdUp ? 450 : 300}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
