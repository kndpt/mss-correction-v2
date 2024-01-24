import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionEntrepriseCallToAction() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
        px: { xs: 0, md: 15 },
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
            <Typography variant="h4">Expertise linguistique approfondie</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              Ma maîtrise de la langue française assure une correction précise de vos textes,
              éliminant erreurs grammaticales, fautes d&apos;orthographe et problèmes de syntaxe.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button color="inherit" size="large" variant="contained" href={`${paths.service}`}>
              Me faire confiance
            </Button>
          </m.div>
        </Box>
      </m.div>
    </Container>
  );
}
