import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import TarifsView from '../tarifs/tarifs-view';

// ----------------------------------------------------------------------

export default function HomeSimulator() {
  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Sachez à l&apos;avance combien vous allez payer
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2">Tarification transparente</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'grey.500', mb: 4 }}>
          Calculez le coût de mes services de correction basés sur le nombre de mots et le délai
          souhaité. <br />
          Utilisez mon simulateur pour obtenir une estimation claire et précise.
        </Typography>
      </m.div>
    </Stack>
  );

  const renderSimulator = (
    <m.div variants={varFade().inUp}>
      <Card sx={{ p: { xs: 0, md: 3 } }}>
        <TarifsView />
      </Card>
    </m.div>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 5 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {renderSimulator}
      </Container>
    </Box>
  );
}
