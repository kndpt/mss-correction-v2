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

export default function CorrectionLettreMotivationQuestions() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.serviceLettreMotivation}
      sx={{ mb: 5 }}
    >
      Commander (15€)
    </Button>
  );

  const renderDescription = (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'right',
        },
      }}
    >
      <m.div variants={varFade().inLeft}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Tu as des questions ?
        </Typography>
      </m.div>

      <m.div variants={varFade().inRight}>
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
          Tu as des questions sur la correction de ta lettre de motivation ? Je suis là pour y répondre.
          Tu peux me contacter à tout moment via le chat en bas à droite de l&apos;écran.
          <br />
          Sinon, tu peux commander ta correction dès maintenant pour seulement 15€.
        </Typography>
      </m.div>

      <m.div variants={varFade().inLeft}> {renderBtn} </m.div>
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
          {renderDescription}
        </Grid>
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inRight}>
            <Image
              disabledEffect
              alt="rocket"
              src="/assets/illustrations/characters/character_4.png"
              width={mdUp ? 230 : 140}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
