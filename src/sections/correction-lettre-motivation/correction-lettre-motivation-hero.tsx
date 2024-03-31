import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionLettreMotivationHero() {
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
            Correcteur professionnel
          </Typography>
        </m.div>
        <m.div variants={varFade().inDown}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 4 }}>
            <Image
              disabledEffect
              alt="grid"
              src="/assets/illustrations/characters/correction-office.png"
              width={350}
            />
          </Box>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">Lettre de motivation</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography color="text.secondary">
            Booste l&apos;impact de ta lettre de motivation avec une correction et un embellissement. En
            tant que correctrice freelance, je m&apos;engage personnellement à polir chaque mot pour que
            ta candidature se distingue et capte l&apos;attention des recruteurs. Confie-moi tes mots, je
            t&apos;aiderai à ouvrir les portes de ton avenir professionnel.
          </Typography>
        </m.div>
      </Stack>
    </Container>
  );
}
