'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import { usePlausible } from 'next-plausible';

import { Box, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import CompactLayout from 'src/layouts/compact';
import OrderCompleteIllustration from 'src/assets/illustrations/order-complete-illustration';

import { varBounce, MotionContainer } from 'src/components/animate';

import { EPlausibleEvent } from 'src/types/e-plausible-event';

interface SuccessPageProps {
  searchParams: {
    price: string;
  };
}

export default function SuccessPage({ searchParams }: Readonly<SuccessPageProps>) {
  const plausible = usePlausible();
  const { price } = searchParams;

  useEffect(() => {
    if (price) {
      plausible(EPlausibleEvent.PAGE_VIEWED_SUCCESS_ORDER, {
        props: {},
        revenue: { amount: Number(price), currency: 'EUR' },
      });
    }
  }, [plausible, price]);

  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <OrderCompleteIllustration
            sx={{
              height: 260,
            }}
          />
        </m.div>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Merci pour votre confiance !
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Box
            sx={{
              my: 5,
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>
              Votre commande a bien été enregistrée. Vous allez recevoir un email de confirmation.
            </Typography>
          </Box>
        </m.div>

        <Button href={paths.dashboard.order.root} size="large" variant="contained">
          Voir ma commande
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
