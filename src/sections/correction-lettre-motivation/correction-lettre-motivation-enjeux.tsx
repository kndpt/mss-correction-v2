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

export default function CorrectionLettreMotivationEnjeux() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.tarifs}
    >
      Envoyez-la, brillez !
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
      <m.div variants={varFade().inDown} >
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Ne laissez pas une petite erreur éclipser votre potentiel
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
          Je sais, rédiger une lettre de motivation, c&apos;est pas toujours simple. Une petite faute ou
          une tournure maladroite, et hop, on risque de passer à côté du job de nos rêves. C&apos;est
          dur, mais c&apos;est la réalité. Alors, je suis là pour t&apos;aider à peaufiner ta lettre, pour que
          tu sortes du lot. Ensemble, on va faire en sorte qu&apos;elle te représente au mieux !
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
              src="/assets/illustrations/characters/character_6.png"
              width={mdUp ? 230 : 140}
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
