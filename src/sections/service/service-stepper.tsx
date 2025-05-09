'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePlausible } from 'next-plausible';
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from '@firebase/functions';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { alpha } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { firebaseApp } from 'src/utils/firebase';

import { useAuthContext } from 'src/auth/hooks';
import { useServiceState } from 'src/providers/service/service-provider';
import { useFirebaseStorage } from 'src/storage/hooks/useFirebaseStorage';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import { IFile } from 'src/types/order';
import { EPlausibleEvent } from 'src/types/e-plausible-event';

import ServiceStepLogin from './steps/service-step-login';
import ServiceStepSummary from './steps/service-step-summary';
import ServiceStepSimulator from './steps/service-step-simulator';
import ServiceStepInformation from './steps/service-step-information';
import ServiceStepUploadDocument from './steps/service-step-upload-document';

// ----------------------------------------------------------------------

const steps = ['Document', 'Délais et services', 'Informations', 'Comptes', 'Récapitulatif'];

const CREATE_CHECKOUT_SESSION_CLOUD_FUNCTION =
  process.env.NEXT_PUBLIC_CREATE_CHECKOUT_SESSION_CLOUD_FUNCTION ??
  'no_create_checkout_session_cloud_function';

// TODO: rework this component

export default function ServiceStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { state: service, getTotalDays } = useServiceState();
  const { authenticated, logout, user } = useAuthContext();
  const firebaseStorage = useFirebaseStorage();
  const functions = getFunctions(firebaseApp);
  const plausible = usePlausible();

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    switch (activeStep) {
      case 0:
        plausible(EPlausibleEvent.SERVICE_DOCUMENT_UPLOADED, { props: {} });
        break;
      case 1:
        plausible(EPlausibleEvent.SERVICE_OPTIONS_SELECTED, { props: {} });
        break;
      case 2:
        plausible(EPlausibleEvent.SERVICE_INFORMATION_ENTERED, { props: {} });
        break;
      case 3:
        plausible(EPlausibleEvent.SERVICE_ACCOUNTS_VALIDATED, { props: {} });
        break;
      default:
        break;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isNextDisabled = () => {
    if (activeStep === 0 && service.uploadedFile.file === null) return true;
    if (activeStep === 2 && service.title.length < 4) return true;
    if (activeStep === 3 && !authenticated) return true;
    return false;
  };

  const handleOrder = async () => {
    try {
      if (!authenticated || !service.uploadedFile.file || !user) return;
      plausible(EPlausibleEvent.SERVICE_GO_TO_PAYMENT, {
        props: {},
        revenue: { amount: service.price, currency: 'EUR' },
      });
      setIsLoading(true);
      const filePath = `${user.email}/${service.uploadedFile.name}`;
      await onUploadFile(service.uploadedFile, filePath);
      await redirectToCheckout(
        getTotalDays(),
        filePath,
        service.price,
        service.informations,
        user.email,
        service.title
      );
      setIsLoading(false);
    } catch (error) {
      /* @ts-ignore */
      alert(error.message);
      setIsLoading(false);
    }
  };

  const onUploadFile = async (uploadedFile: IFile, filePath: string) => {
    if (!uploadedFile.file) return;

    try {
      await firebaseStorage.uploadFile(filePath, uploadedFile.file);
    } catch (error) {
      /* @ts-ignore */
      throw new Error(error.message);
    }
  };

  async function redirectToCheckout(
    totalDays: number,
    filePath: string,
    price: number,
    informations: string,
    email: string,
    title: string
  ) {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? 'no_stipe_public_key'
    );
    const createCheckoutSession = httpsCallable(functions, CREATE_CHECKOUT_SESSION_CLOUD_FUNCTION);

    const stripe = await stripePromise;
    const session = await createCheckoutSession({
      price,
      success_url: `${window.location.origin}/dashboard/success?price=${price}`,
      cancel_url: `${window.location.origin}/service`,
      totalDays,
      filePath,
      informations,
      email,
      title: title.length > 0 ? title : 'Sans titre',
      service,
    });

    if (stripe && session) {
      const { error } = await stripe.redirectToCheckout({
        // @ts-ignore
        sessionId: session.data.id,
      });

      if (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            {activeStep === 0 && <ServiceStepUploadDocument />}
            {activeStep === 1 && <ServiceStepSimulator />}
            {activeStep === 2 && <ServiceStepInformation />}
            {activeStep === 3 && (
              <ServiceStepLogin
                authenticated={authenticated}
                handleNext={handleNext}
                logout={logout}
              />
            )}
            {activeStep === 4 && <ServiceStepSummary />}
          </Paper>

          <Link href={paths.tarifs}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'underline',
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              Pas encore prêt ? Essayez mon simulateur.
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ maxHeight: 40 }}
            >
              Retour
            </Button>

            {activeStep === steps.length - 1 && (
              <Image alt="stripe" src="/assets/images/powered_by_stripe.png" sx={{ width: 200 }} />
            )}

            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                sx={{ maxHeight: 40 }}
                startIcon={<Iconify icon="solar:card-2-broken" />}
                onClick={handleOrder}
                disabled={isLoading}
              >
                Passer au paiement
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button
                variant="contained"
                disabled={isNextDisabled()}
                sx={{ maxHeight: 40 }}
                onClick={handleNext}
              >
                Suivant
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );
}
