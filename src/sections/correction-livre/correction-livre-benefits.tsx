import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Grid, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

export const OPTIONS = [
  { checked: true, label: 'Correction orthographique adaptée à votre livre' },
  { checked: true, label: 'Correction de la syntaxe pour une lecture fluide' },
  { checked: true, label: 'Correction grammaticale approfondie' },
  { checked: true, label: 'Retouches stylistiques incluses' },
  { checked: true, label: 'Révision de la ponctuation pour un rythme optimal' },
  { checked: true, label: 'Suppression des répétitions pour renforcer l’impact' },
  { checked: true, label: 'Relecture complète pour la cohérence de votre livre' },
  { checked: true, label: 'Reformulation des phrases floues ou maladroites' },
];

// ----------------------------------------------------------------------

export default function CorrectionLivreBefenits() {
  const renderElement = (label: string, checked: boolean, key: number, isLeft: boolean = false) => (
    <m.div variants={isLeft ? varFade().inLeft : varFade().inRight} key={key}>
      <Box
        sx={{
          display: 'flex',
          py: 2,
          flexDirection: `${isLeft ? 'row-reverse' : 'row'}`,
        }}
      >
        <Iconify
          icon="solar:verified-check-bold"
          color={checked ? 'green' : ''}
          width={20}
          height={20}
        />
        <Typography variant="subtitle2" sx={isLeft ? { mr: 2 } : { ml: 2 }}>
          {label}
        </Typography>
      </Box>
    </m.div>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      <m.div variants={varFade().inDown}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Accueil',
              href: paths.home,
            },
            {
              name: 'Correction de livre',
            },
          ]}
          sx={{
            mb: 5,
          }}
        />
      </m.div>
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inDown}>
          <Typography variant="h2">Quelques avantages pour votre livre</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography sx={{ color: 'text.secondary' }}>
            Correction normale ou avec embellissement
          </Typography>
        </m.div>

        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
          >
            {OPTIONS.slice(0, 4).map((option, index) =>
              renderElement(option.label, option.checked, index, true)
            )}
          </Grid>
          <Grid item xs={6}>
            {OPTIONS.slice(4, 8).map((option, index) =>
              renderElement(option.label, option.checked, index)
            )}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
