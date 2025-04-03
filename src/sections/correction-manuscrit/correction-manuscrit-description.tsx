import { m } from 'framer-motion';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';
// ----------------------------------------------------------------------

export default function CorrectionManuscritDescription() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h2">
        La qualité professionnelle, au service de votre manuscrit
      </Typography>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          En faisant appel à mes services, vous confiez votre manuscrit à une correctrice attentive,
          à l&apos;écoute de vos intentions d&apos;auteur. Qu&apos;il s&apos;agisse d&apos;un roman,
          d&apos;un récit de vie, d&apos;un essai ou d&apos;un projet autoédité, chaque manuscrit
          mérite une langue impeccable. Je prends en charge la correction avec exigence et
          bienveillance — pour que vous puissiez vous concentrer sur l&apos;essentiel : votre voix,
          votre message, votre univers. Les mots, eux, sont entre des mains expertes.
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
