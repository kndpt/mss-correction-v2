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
      <Typography variant="h2">La qualité professionnelle à portée de main</Typography>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          J&apos;offre un service abordable de relecture et de correction roman, idéal pour les
          écrivains indépendants à budget limité. Parce que chaque histoire, en particulier celles
          des romans, mérite d&apos;être racontée avec clarté et élégance, sans compromis sur la
          qualité.
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
