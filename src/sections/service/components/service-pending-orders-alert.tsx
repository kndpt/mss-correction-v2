'use client';

import Link from 'next/link';

import { Alert, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { useAuthContext } from 'src/auth/hooks';
import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFirestoreOrders } from 'src/firestore/hooks/useFirestoreOrders';

import Iconify from 'src/components/iconify';

import { EOrderStatus } from 'src/types/order';

export default function ServicePendingOrdersAlert() {
  const { authenticated } = useAuthContext();
  const { orders, loading } = useFirestoreOrders();
  const isAdmin = useIsAdmin();

  // Ne pas afficher pour les admins ou si pas connecté
  if (!authenticated || isAdmin || loading || !orders) return null;

  const pendingOrders = orders.filter(
    (order) => order.status === EOrderStatus.PENDING && !order.intent
  );

  const inProgressOrders = orders.filter(
    (order) => order.status === EOrderStatus.PAID || order.status === EOrderStatus.IN_PROGRESS
  );

  if (pendingOrders.length === 0 && inProgressOrders.length === 0) return null;

  const totalPendingAmount = pendingOrders.reduce((sum, order) => sum + order.service.price, 0);
  const totalInProgressAmount = inProgressOrders.reduce(
    (sum, order) => sum + order.service.price,
    0
  );

  return (
    <>
      {/* Alerte pour commandes en attente de paiement */}
      {pendingOrders.length > 0 && (
        <Alert
          severity="warning"
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-message': { width: '100%' },
          }}
          action={
            <Link href={paths.dashboard.order.root} passHref>
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon="solar:card-2-broken" />}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Finaliser
              </Button>
            </Link>
          }
        >
          <Typography variant="subtitle2" gutterBottom>
            {pendingOrders.length === 1
              ? 'Vous avez une commande en attente de paiement'
              : `Vous avez ${pendingOrders.length} commandes en attente de paiement`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total : {fCurrency(totalPendingAmount)}€ • Finalisez votre commande pour commencer la
            correction
          </Typography>
        </Alert>
      )}

      {/* Alerte pour commandes en cours */}
      {inProgressOrders.length > 0 && (
        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-message': { width: '100%' },
          }}
          action={
            <Link href={paths.dashboard.order.root} passHref>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon="solar:eye-bold" />}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Voir
              </Button>
            </Link>
          }
        >
          <Typography variant="subtitle2" gutterBottom>
            {inProgressOrders.length === 1
              ? 'Vous avez une commande en cours'
              : `Vous avez ${inProgressOrders.length} commandes en cours`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total : {fCurrency(totalInProgressAmount)} • Suivez l&apos;avancement de vos corrections
          </Typography>
        </Alert>
      )}
    </>
  );
}
