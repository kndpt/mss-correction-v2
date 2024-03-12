import { m } from 'framer-motion';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeBlog() {
  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Container sx={{ p: { xs: 0, md: 10 }, pt: { md: 0 } }}>
        <Image
          alt="fichier de correction"
          src="/assets/images/home/memoire-file.png"
          sx={{
            width: { xs: '100%', md: '45%' },
            borderRadius: 2,
            my: { xs: 10, md: 15 },
            transform: 'rotate(3deg)',
          }}
        />
      </Container>
    </m.div>
  );

  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          blog
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2"> Mes conseils en écriture </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de
          motivation, ou encore un roman.
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Button color="inherit" size="large" variant="contained" href={paths.post.root}>
          Découvrir mes astuces
        </Button>
      </m.div>

      {renderImg}
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        pt: { xs: 10, md: 15 },
      }}
    >
      {renderDescription}
    </Container>
  );
}
