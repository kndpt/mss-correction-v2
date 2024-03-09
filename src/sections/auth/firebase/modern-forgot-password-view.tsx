'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { PasswordIcon } from 'src/assets/icons';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernForgotPasswordView() {
  const { forgotPassword } = useAuthContext();
  const [message, setMessage] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required("L'email est requis").email('Email non valide'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!forgotPassword) return;

      await forgotPassword(data.email);
      setMessage('Un lien de réinitialisation a été envoyé à votre adresse e-mail avec succès.');
    } catch (error) {
      console.error(error);
      setMessage("Nous n'avons pas pu envoyer le lien de réinitialisation. Veuillez réessayer.");
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        Envoyer le lien
      </LoadingButton>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {message}
      </Typography>

      <Link
        href={paths.auth.firebase.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Retourner à la connexion
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Mot de passe oublié ?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Entrez l&apos;adresse e-mail associée à votre compte et nous vous enverrons un lien de
          réinitialisation du mot de passe.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
