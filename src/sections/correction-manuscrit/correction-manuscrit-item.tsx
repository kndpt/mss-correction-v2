import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const CorrectionManuscritItem = () => {
  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="solar:pen-new-square-linear" />}
      href={paths.service}
    >
      Commander une correction
    </Button>
  );

  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Correctrice professionnelle
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Boostez votre manuscrit</Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography color="text.secondary">
          Choisir mes services, c&apos;est faire équipe avec une correctrice de confiance, qui
          comprend l&apos;importance de chaque mot dans la construction de votre manuscrit. Ma
          relecture attentive vous garantit un texte clair, fluide et fidèle à votre voix
          d&apos;auteur — quel que soit le type de manuscrit que vous écrivez.
        </Typography>
      </m.div>
    </Stack>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>{renderBtn}</Box>
    </Container>
  );
};
