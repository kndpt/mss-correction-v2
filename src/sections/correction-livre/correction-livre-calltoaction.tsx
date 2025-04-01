import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionLivreCallToAction() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 0,
              md: 0,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h4">Transformez votre livre en œuvre d&apos;art</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              L&apos;accent est mis sur une correction minutieuse qui respecte la voix originale de
              l&apos;écrivain.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button color="inherit" size="large" variant="contained" href={`${paths.service}`}>
              Corriger mon livre
            </Button>
            <Button
              color="inherit"
              size="large"
              variant="soft"
              href={`${paths.home}`}
              sx={{ ml: { xs: 0, md: 2 } }}
            >
              Revenir à l&apos;accueil
            </Button>
          </m.div>
        </Box>
      </m.div>
    </Container>
  );
}
