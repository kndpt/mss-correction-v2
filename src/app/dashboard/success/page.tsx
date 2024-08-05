'use client';

import { m } from 'framer-motion';

import { Box, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import CompactLayout from 'src/layouts/compact';
import OrderCompleteIllustration from 'src/assets/illustrations/order-complete-illustration';

import { varBounce, MotionContainer } from 'src/components/animate';

export default function SuccessPage() {
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
