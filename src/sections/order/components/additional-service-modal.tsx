'use client';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  List,
  Stack,
  Paper,
  alpha,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  isOrderCompleted?: boolean;
};

export default function AdditionalServiceModal({ open, onClose, isOrderCompleted = false }: Props) {
  const handleRedirectToStripe = () => {
    // TODO: Replace with actual Stripe product URL when created
    console.log('Redirect to Stripe product for consulting service');
    // window.open('STRIPE_PRODUCT_URL', '_blank');
    onClose();
  };

  const clientRequests = [
    {
      icon: 'solar:structure-bold-duotone',
      text: 'Conseils sur la structure',
      detail: 'Organisation des chapitres, transitions, équilibre du récit',
    },
    {
      icon: 'solar:book-bold-duotone',
      text: "Conseils sur l'histoire",
      detail: 'Intrigue, développement narratif, cohérence temporelle',
    },
    {
      icon: 'solar:puzzle-bold-duotone',
      text: 'Vérification de la cohérence',
      detail: 'Logique interne, continuité des éléments',
    },
    {
      icon: 'solar:pen-bold-duotone',
      text: "Conseils sur la façon d'écrire",
      detail: 'Style, rythme, techniques narratives',
    },
    {
      icon: 'solar:check-circle-bold-duotone',
      text: 'Vérification des sources',
      detail: 'Dates, lieux, références historiques ou factuelles',
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 2 }}>
        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:compass-bold-duotone" width={28} color="primary.main" />
          </Box>
          <Typography variant="h5" color="text.primary" fontWeight="600">
            Accompagnement personnalisé
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Les conseils que mes clients me demandent le plus souvent
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Introduction */}
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
            Vous avez investi dans la correction de votre texte, c&apos;est parfait. Je peux
            maintenant vous accompagner sur les aspects les plus demandés par mes clients.
          </Typography>

          {/* Services list */}
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            }}
          >
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ mb: 2 }}>
              Mes 5 domaines d&apos;expertise
            </Typography>
            <List dense sx={{ p: 0 }}>
              {clientRequests.map((request, index) => (
                <ListItem key={index} sx={{ py: 1.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Iconify icon={request.icon} width={24} color="primary.main" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5 }}>
                      {request.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.detail}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Insight */}
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.16)}`,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Iconify icon="solar:lightbulb-bold-duotone" width={20} color="info.main" />
              <Typography variant="body2" color="info.dark" sx={{ fontWeight: 500 }}>
                Ces questions reviennent constamment chez mes clients. Ce sont les aspects les plus
                délicats à maîtriser seul.
              </Typography>
            </Stack>
          </Paper>

          <Divider sx={{ my: 1 }} />

          {/* Testimonial */}
          <Box sx={{ textAlign: 'center', py: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
              &quot;Les conseils sur la structure ont transformé mon approche. Mon éditeur a tout de
              suite vu la différence.&quot;
            </Typography>
            <Typography variant="caption" color="text.disabled" fontWeight="500">
              — Client récent
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 500 }}>
          Pas maintenant
        </Button>
        <Button
          variant="contained"
          onClick={handleRedirectToStripe}
          endIcon={<Iconify icon="solar:arrow-right-bold" />}
          sx={{
            fontWeight: 500,
            px: 3,
            py: 1,
          }}
        >
          {isOrderCompleted ? "Découvrir l'offre" : 'En savoir plus'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
