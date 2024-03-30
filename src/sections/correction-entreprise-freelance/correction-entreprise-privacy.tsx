import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function CorrectionEntreprisePrivacy() {
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
          px: { xs: 0, md: 15 },
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
            En tant que correcteur professionnel, je comprends la sensibilité des documents d&apos;entreprise.
            Mon engagement envers la confidentialité garantit la sécurité et la discrétion absolues de tous vos documents. Si
            vous souhaitez vous sécuriser davantage, je peux remplir un accord de confidentialité,
            sur votre demande.
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
