import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeEntreprise() {
  return (
    <m.div variants={varFade().in}>
      <Box
        sx={{
          textAlign: 'center',
          mt: {
            xs: 5,
            md: 5,
          },
          mb: {
            xs: 5,
            md: 10,
          },
        }}
      >
        <m.div variants={varFade().inDown}>
          <Typography variant="h4">Vous êtes une entreprise ?</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
            Je propose des solutions adaptées pour répondre aux besoins spécifiques des
            professionnels.
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Button
            color="inherit"
            size="large"
            variant="contained"
            href={paths.correctionEntreprise}
          >
            Cliquez ici
          </Button>
        </m.div>
      </Box>
    </m.div>
  );
}
