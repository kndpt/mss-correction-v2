import { m } from 'framer-motion';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';
// ----------------------------------------------------------------------

export default function CorrectionRomanDescription() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h2">
        La qualité professionnelle à portée de main pour votre roman
      </Typography>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          En me choisissant, vous faites appel à une correctrice à l’écoute de vos besoins. Chaque
          livre mérite une langue irréprochable et une narration soignée. Confiez-moi la correction
          de votre roman : je prends en charge les aspects linguistiques pour que vous puissiez vous
          concentrer pleinement sur votre créativité.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Container sx={{ p: { xs: 0, md: 10 }, pt: { md: 0 } }}>
        <Image
          alt="fichier de correction"
          src="/assets/images/home/roman-file.png"
          sx={{
            width: { xs: '100%', md: '45%' },
            borderRadius: 2,
            my: { xs: 10, md: 15 },
            transform: 'rotate(-3deg)',
          }}
        />
      </Container>
    </m.div>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 0 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {renderImg}
      </Container>
    </Box>
  );
}
