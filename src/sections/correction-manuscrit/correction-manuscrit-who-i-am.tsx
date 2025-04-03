import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const CorrectionManuscritWhoIAm = () => {
  const theme = useTheme();
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Correctrice professionnelle
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Qui suis-je ?</Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography color="text.secondary">
          Enchantée, moi c&apos;est Océane.
          <br />
          Correctrice freelance depuis 4 ans, j&apos;accompagne les auteurs dans la relecture et la
          correction de leur manuscrit, avec attention et passion.
          <br />
          Qu&apos;il s&apos;agisse de votre premier projet ou d&apos;un texte plus abouti, je vous
          aide à rendre votre manuscrit fluide, sans fautes, et prêt à être partagé.
          <br />
          <b>Un doute, une question ? Écrivez-moi, je serai ravie de vous lire. ✨</b>
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 6 }}>
      <m.div variants={varFade().inDown}>
        <Image
          disabledEffect
          alt="grid"
          src="/assets/images/oceane_profile.webp"
          width={250}
          sx={{
            borderRadius: '50%',
            border: '6px solid',
            borderColor: theme.palette.primary.main,
          }}
        />
      </m.div>
    </Box>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      {renderContent}
      {renderDescription}
    </Container>
  );
};
