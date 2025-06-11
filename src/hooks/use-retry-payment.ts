import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from '@firebase/functions';

import { firebaseApp } from 'src/utils/firebase';

import { useSnackbar } from 'src/components/snackbar';

import { IOrder } from 'src/types/order';

const CREATE_CHECKOUT_SESSION_RETRY_CLOUD_FUNCTION =
  process.env.NEXT_PUBLIC_CREATE_CHECKOUT_SESSION_RETRY_CLOUD_FUNCTION ??
  'createCheckoutSessionRetry';

export function useRetryPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const retryPayment = useCallback(
    async (order: IOrder) => {
      if (!order || isProcessing) return;

      try {
        setIsProcessing(true);

        const stripePromise = loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? 'no_stripe_public_key'
        );
        const functions = getFunctions(firebaseApp);
        const createCheckoutSessionRetry = httpsCallable(
          functions,
          CREATE_CHECKOUT_SESSION_RETRY_CLOUD_FUNCTION
        );

        const stripe = await stripePromise;
        const session = await createCheckoutSessionRetry({
          orderId: order.id,
          success_url: `${window.location.origin}/dashboard/success?price=${order.service.price}`,
          cancel_url: `${window.location.origin}/dashboard/order`,
        });

        if (stripe && session) {
          const { error } = await stripe.redirectToCheckout({
            // @ts-ignore
            sessionId: session.data.id,
          });

          if (error) {
            throw new Error(error.message);
          }
        }
      } catch (error) {
        console.error('Erreur lors du retry de paiement:', error);
        enqueueSnackbar('Erreur lors du traitement du paiement. Veuillez réessayer.', {
          variant: 'error',
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, enqueueSnackbar]
  );

  return { retryPayment, isProcessing };
}
