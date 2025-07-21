'use client';

import { useState } from 'react';

import { Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ManualOrderForm from 'src/components/manual-order/manual-order-form';

// ----------------------------------------------------------------------

export default function ManualOrderView() {
  const router = useRouter();
  const settings = useSettingsContext();
  const [isCreating, setIsCreating] = useState(true);

  const handleSuccess = (orderId: string) => {
    // Rediriger vers la commande créée
    router.push(paths.dashboard.order.details(orderId));
  };

  const handleCancel = () => {
    // Retourner à la liste des commandes
    router.push(paths.dashboard.order.root);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Créer une commande manuelle"
        links={[
          { name: 'Dashboard', href: paths.dashboard.order.root },
          { name: 'Commandes', href: paths.dashboard.order.root },
          { name: 'Nouvelle commande manuelle' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Créez une commande manuelle pour un client existant. Le système calculera automatiquement le
        prix et la date de livraison selon les options sélectionnées.
      </Typography>

      {isCreating && <ManualOrderForm onSuccess={handleSuccess} onCancel={handleCancel} />}
    </Container>
  );
}
