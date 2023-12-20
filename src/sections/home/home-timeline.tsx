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

export default function TimelineSection() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      size="large"
      variant="outlined"
      target="_blank"
      rel="noopener"
      href={paths.tarifs}
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
    >
      Accéder au simulateur
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
            mb: { md: 3 },
          }}
        >
          Suivez en temps réel
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
          Mettez-vous au cœur de l&apos;action avec le suivi de commande en temps réel. Grâce à une
          timeline interactive, vous visualisez chaque étape de correction de votre document, depuis
          sa réception jusqu&apos;à sa finalisation.
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}> {renderBtn} </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: { xs: 10, md: 10 },
        pb: { xs: 10, md: 10 },
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
              alt="temps réel"
              src="/assets/images/home/timeline.jpg"
              sx={{ transform: 'rotate(3deg)', width: '80%', height: '80%' }}
            />
          </m.div>
        </Grid>

        {!mdUp && (
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            {renderBtn}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
