import { m } from 'framer-motion';
import { track } from '@vutolabs/analytics';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

interface Props {
  description: string;
}

export const CorrectionMemoireWhoIAm = ({ description }: Props) => {
  const theme = useTheme();

  const handleComeupClick = () => {
    track('Cliquer sur le profil Comeup');
    window.open('https://comeup.com/fr/@oceane-mss', '_blank');
  };

  const handleLinkedinClick = () => {
    track('Cliquer sur le profil LinkedIn');
    window.open('https://www.linkedin.com/in/mss-correction/', '_blank');
  };

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
        <Typography color="text.secondary">{description}</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Box
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              +700 avis positifs
            </Typography>
            <Typography variant="body2">
              Découvrez mon profil Comeup et mes retours clients
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleComeupClick}
                endIcon={<Iconify icon="eva:external-link-fill" />}
                sx={{
                  px: 3,
                  py: 1,
                  boxShadow: theme.customShadows.primary,
                  borderRadius: 1.5,
                }}
              >
                Voir mon profil
              </Button>
            </m.div>

            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={handleLinkedinClick}
                startIcon={<Iconify icon="eva:linkedin-fill" />}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 1.5,
                }}
              >
                LinkedIn
              </Button>
            </m.div>
          </Stack>
        </Box>
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
