'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import {
  Box,
  Card,
  Chip,
  Grid,
  List,
  Button,
  Dialog,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { ELayoutServiceTier, ILayoutService, EOrderStatus } from 'src/types/order';
import { LAYOUT_SERVICES, formatLayoutServicePrice, getLayoutServiceBadgeColor } from 'src/utils/layout-services';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  orderStatus: EOrderStatus;
  onServiceSelect?: (service: ILayoutService) => void;
};

export default function LayoutServicesUpsell({ orderStatus, onServiceSelect }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedService, setSelectedService] = useState<ILayoutService | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Ne pas afficher si la commande est en cours ou terminée
  const shouldShowUpsell = orderStatus === EOrderStatus.PAID || orderStatus === EOrderStatus.DONE;

  if (!shouldShowUpsell) {
    return null;
  }

  const handleServiceSelect = (service: ILayoutService) => {
    setSelectedService(service);
    setConfirmDialogOpen(true);
  };

  const handleConfirmOrder = () => {
    if (selectedService) {
      onServiceSelect?.(selectedService);
      enqueueSnackbar('Service ajouté avec succès ! Nous vous contacterons sous peu.', {
        variant: 'success',
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
      });
    }
    setConfirmDialogOpen(false);
    setSelectedService(null);
  };

  const getBadgeText = (tier: ELayoutServiceTier) => {
    switch (tier) {
      case ELayoutServiceTier.BASIC:
        return 'ENTRÉE DE GAMME';
      case ELayoutServiceTier.INTERMEDIATE:
        return 'POPULAIRE';
      case ELayoutServiceTier.PREMIUM:
        return 'PREMIUM';
      default:
        return '';
    }
  };

  const getRecommendationText = (tier: ELayoutServiceTier) => {
    switch (tier) {
      case ELayoutServiceTier.BASIC:
        return 'Parfait pour commencer en auto-édition';
      case ELayoutServiceTier.INTERMEDIATE:
        return 'Le plus demandé par nos clients';
      case ELayoutServiceTier.PREMIUM:
        return 'Pour un rendu professionnel exceptionnel';
      default:
        return '';
    }
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
          🚀 Ajoutez une mise en page professionnelle
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
          Gagnez du temps et évitez les soucis techniques avec nos formats prêts-à-publier
        </Typography>

        <Grid container spacing={3}>
          {LAYOUT_SERVICES.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  border: service.tier === ELayoutServiceTier.INTERMEDIATE ? 2 : 1,
                  borderColor: service.tier === ELayoutServiceTier.INTERMEDIATE ? 'warning.main' : 'divider',
                  transform: service.tier === ELayoutServiceTier.INTERMEDIATE ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: service.tier === ELayoutServiceTier.INTERMEDIATE ? 'scale(1.07)' : 'scale(1.02)',
                    boxShadow: 4
                  }
                }}
              >
                {service.tier === ELayoutServiceTier.INTERMEDIATE && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1
                    }}
                  >
                    <Chip
                      label="RECOMMANDÉ"
                      color="warning"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                )}

                <CardHeader
                  title={
                    <Box>
                      <Chip
                        label={getBadgeText(service.tier)}
                        color={getLayoutServiceBadgeColor(service.tier)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" component="div">
                        {service.name}
                      </Typography>
                    </Box>
                  }
                  subheader={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                      <Typography variant="caption" color="success.main" sx={{ fontStyle: 'italic', display: 'block', mt: 0.5 }}>
                        {getRecommendationText(service.tier)}
                      </Typography>
                    </Box>
                  }
                  sx={{ pb: 1 }}
                />

                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      {formatLayoutServicePrice(service.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Livré en {service.estimatedDays} jours
                    </Typography>
                  </Box>

                  <List dense>
                    {service.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Iconify 
                            icon="eva:checkmark-circle-2-fill" 
                            color="success.main" 
                            width={20} 
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant={service.tier === ELayoutServiceTier.INTERMEDIATE ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => handleServiceSelect(service)}
                    color={service.tier === ELayoutServiceTier.INTERMEDIATE ? 'warning' : 'primary'}
                  >
                    Commander ce service
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="eva:info-fill" color="info.main" width={20} />
            <strong>Pourquoi choisir nos services de mise en page ?</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, ml: 3 }}>
            • Formats compatibles avec toutes les plateformes de publication<br />
            • Gain de temps considérable (plus de soucis techniques)<br />
            • Rendu professionnel qui valorise votre contenu<br />
            • Support dédié en cas de problème
          </Typography>
        </Box>
      </Box>

      {/* Dialog de confirmation */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirmer la commande</DialogTitle>
        <DialogContent>
          {selectedService && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedService.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Prix : <strong>{formatLayoutServicePrice(selectedService.price)}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Délai de livraison : {selectedService.estimatedDays} jours
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Êtes-vous sûr de vouloir ajouter ce service à votre commande ? 
                Nous vous contacterons dans les plus brefs délais pour organiser la mise en page.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleConfirmOrder}>
            Confirmer la commande
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}