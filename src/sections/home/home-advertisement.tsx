import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  const theme = useTheme();

  const renderDescription = (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: 'common.white', mb: 5, typography: 'h2' }}
      >
        Passez à la vitesse supérieure
        <br /> dès aujourd&apos;hui
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="contained"
            rel="noopener"
            href={paths.tarifs}
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            Commander maintenant
          </Button>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            rel="noopener"
            href={paths.tarifs}
            endIcon={<Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />}
            sx={{
              color: 'common.white',
              '&:hover': { borderColor: 'currentColor' },
            }}
          >
            Utiliser le simulateur
          </Button>
        </m.div>
      </Stack>
    </Box>
  );

  const renderImg = (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <Box
        component={m.img}
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="rocket"
        src="/assets/images/home/rocket.webp"
        sx={{ maxWidth: 460 }}
      />
    </Stack>
  );

  return (
    <Container component={MotionViewport} sx={{ pb: 8 }}>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          pb: { xs: 5, md: 0 },
        }}
      >
        {renderImg}

        {renderDescription}
      </Stack>
    </Container>
  );
}
