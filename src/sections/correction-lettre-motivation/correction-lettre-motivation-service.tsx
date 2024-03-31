import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionLettreMotivationService() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        pt: { xs: 10, md: 10 },
        pb: { xs: 10, md: 15 },
        px: { xs: 2, md: 15 },
      }}
    >
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inDown}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Service de correction et embellissement
          </Typography>
        </m.div>
        <m.div variants={varFade().inDown}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 4 }}>
            <Image
              effect="black-and-white"
              alt="grid"
              src="/assets/illustrations/characters/character_11.png"
              width={250}
            />
          </Box>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">Lettre de motivation</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography color="text.secondary">
            Voilà comment je transforme ta lettre : je traque les petites coquilles et peaufine tes
            phrases pour que ta motivation saute aux yeux. Imagine ta lettre avant et après : comme
            un diamant brut qui devient éclatant. C&apos;est ton moment de briller, et je suis là pour ça
            !
          </Typography>
        </m.div>
      </Stack>
    </Container>
  );
}
