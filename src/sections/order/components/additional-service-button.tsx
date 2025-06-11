'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Chip, alpha } from '@mui/material';

import Iconify from 'src/components/iconify';

import { EOrderStatus } from 'src/types/order';

import AdditionalServiceModal from './additional-service-modal';

// ----------------------------------------------------------------------

type Props = {
  orderStatus: EOrderStatus;
};

export default function AdditionalServiceButton({ orderStatus }: Props) {
  const [open, setOpen] = useState(false);

  const isOrderCompleted = orderStatus === EOrderStatus.DONE;
  const canShowService = [EOrderStatus.PAID, EOrderStatus.IN_PROGRESS, EOrderStatus.DONE].includes(
    orderStatus
  );

  if (!canShowService) return null;

  return (
    <>
      <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <Button
          variant={isOrderCompleted ? 'contained' : 'outlined'}
          color="primary"
          endIcon={<Iconify icon="solar:pen-new-round-bold-duotone" width={20} />} // Changed icon to a star to represent excellence in service
          onClick={() => setOpen(true)}
          size="small"
          sx={{
            width: '100%',
            py: 2.5,
            px: 1,
            borderRadius: 1,
            fontWeight: 500,
            ...(isOrderCompleted && {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-1px)',
                boxShadow: (theme) => theme.customShadows.primary,
              },
            }),
            ...(!isOrderCompleted && {
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.48),
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                transform: 'translateY(-1px)',
              },
            }),
            transition: (theme) =>
              theme.transitions.create(['all'], {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          {isOrderCompleted ? 'Accompagnement personnalisé' : "Découvrir nos conseils d'expert"}
        </Button>

        {isOrderCompleted && (
          <Chip
            label="Recommandé"
            color="warning"
            size="small"
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              fontSize: '0.7rem',
              fontWeight: 600,
              bgcolor: 'warning.main',
              color: 'warning.contrastText',
            }}
          />
        )}
      </Box>

      <AdditionalServiceModal
        open={open}
        onClose={() => setOpen(false)}
        isOrderCompleted={isOrderCompleted}
      />
    </>
  );
}
