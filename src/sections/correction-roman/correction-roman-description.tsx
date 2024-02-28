import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionRomanDescription() {
  return (
    <m.div variants={varFade().inDown}>
      <Stack spacing={3} sx={{ textAlign: 'center', py: { md: 16, xs: 8 } }}>
        <Typography variant="h3">La qualité professionnelle à portée de main</Typography>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ color: 'text.secondary' }}>
            J&apos;offre un service abordable de relecture et de correction roman, idéal pour les
            écrivains indépendants à budget limité. Parce que chaque histoire, en particulier celles
            des romans, mérite d&apos;être racontée avec clarté et élégance, sans compromis sur la
            qualité.
          </Typography>
        </m.div>
      </Stack>
    </m.div>
  );
}
