import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomePrivacy() {
  const renderContent = (
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
            md: 5,
          },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Image
            disabledEffect
            alt="confidentialité"
            src="/assets/icons/home/confidentialite.png"
            sx={{ mb: 2, width: 80, height: 80, mx: 'auto' }}
          />
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
            Je m&apos;engage à ne divulguer aucun document et à respecter sa confidentialité.
          </Typography>
        </m.div>
      </Box>
    </m.div>
  );

  return (
    <Box
      sx={{
        py: { xs: 5, md: 5 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <Container component={MotionViewport}>{renderContent}</Container>
    </Box>
  );
}
