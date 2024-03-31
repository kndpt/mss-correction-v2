import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Stack, Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

export const OPTIONS = [
  { checked: false, label: 'Correction orthographique' },
  { checked: false, label: 'Correction de syntaxe' },
  { checked: false, label: 'Correction grammaticale' },
  { checked: false, label: 'Retouches incluses' },
  { checked: true, label: 'Révision de la ponctuation' },
  { checked: true, label: 'Suppression des répétitions' },
  { checked: true, label: "Mots plus jolis à l'écrit" },
  { checked: true, label: 'Reformulation des phrases pas claires' },
];

// ----------------------------------------------------------------------

export default function CorrectionLettreMotivationBenefits() {
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

  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="solar:pen-new-square-linear" />}
      href={paths.service}
    >
      Commander pour seulement 15€
    </Button>
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
              name: 'Correction de lettre de motivation',
            },
          ]}
          sx={{
            mb: 5,
          }}
        />
      </m.div>
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inDown}>
          <Typography variant="h2">Découvre les plus de ma correction</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 620,
              margin: 'auto',
              mt: 3,
            }}
          >
            Tu veux que ta lettre de motivation brille ? J&apos;ai ce qu&apos;il te faut. Voici ce
            que je t&apos;offre :
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

        <m.div variants={varFade().inDown}>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 620,
              margin: 'auto',
              mt: 3,
            }}
          >
            Que tu veuilles une correction simple ou un peu d&apos;embellissement, je suis ton as
            dans la manche. Ta lettre de motivation ne sera pas seulement corrigée ; elle va briller
            et capturer l&apos;attention de celui ou celle qui la lit. Ready to shine?
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Box sx={{ mt: 4 }}>{renderBtn}
          </Box>
        </m.div>
      </Stack>
    </Container>
  );
}
