import { useRouter } from 'next/navigation';
import { track } from '@vutolabs/analytics';

import { Box, Card, Button, Typography, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

export default function CorrectionPromotion() {
  const router = useRouter();

  return (
    <Card
      sx={{
        my: 4,
        borderRadius: 2,
        backgroundColor: 'primary.lighter',
        boxShadow: (theme) => theme.customShadows.z8,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Iconify
            icon="mdi:sparkles"
            sx={{
              color: 'primary.main',
              width: 24,
              height: 24,
              mr: 1,
            }}
          />
          <Typography variant="h6" color="primary.main">
            Vous avez aimé cette correction ?
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Depuis 2019, j’ai corrigé 700+ ouvrages et mémoires. Chaque auteur profite d’un
          accompagnement 100 % humain, sans IA cachée.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Découvrez mes services de correction complets pour votre roman, mémoire, ou tout autre
          document. Mes tarifs sont adaptés à tous les budgets et mes délais flexibles.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Iconify icon="solar:arrow-right-bold" />}
            onClick={() => {
              track('start_correction_free_sample');
              router.push(paths.service);
            }}
            fullWidth
          >
            Commencer maintenant !
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Iconify icon="mdi:information-outline" />}
            onClick={() => {
              // open mail
              track('contact_free_sample');
              window.open('mailto:contact@msscorrection.com', '_blank');
            }}
            fullWidth
          >
            Me contacter
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
