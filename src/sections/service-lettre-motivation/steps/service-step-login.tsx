import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { ConfirmDialog } from 'src/components/custom-dialog';

import FirebaseLoginServiceView from 'src/sections/auth/firebase/firebase-login-service-view';
import FirebaseRegisterServiceView from 'src/sections/auth/firebase/firebase-register-service-view';

type Props = {
  authenticated: boolean;
  handleNext: () => void;
  logout: () => Promise<void>;
};

// ----------------------------------------------------------------------

export default function ServiceStepLogin({ authenticated, handleNext, logout }: Props) {
  const [open, setOpen] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  const renderAuthenticated = () => (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="body2">Vous êtes connecté à votre compte.</Typography>
      <Box display="flex" justifyContent="center" flexDirection="column" gap={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Continuer
        </Button>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Déconnexion
        </Button>
      </Box>
    </Box>
  );

  const handleCreateAccountView = () => setIsCreateAccount(true);
  const handleSignInAccountView = () => setIsCreateAccount(false);

  const renderNotAuthenticated = () =>
    isCreateAccount ? (
      <FirebaseRegisterServiceView handleSignInAccountView={handleSignInAccountView} />
    ) : (
      <FirebaseLoginServiceView handleCreateAccountView={handleCreateAccountView} />
    );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={open}
      onClose={() => setOpen(false)}
      title="Déconnexion"
      content={
        <Typography variant="body2" sx={{ mb: 2 }}>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </Typography>
      }
      action={
        <Button variant="contained" color="error" onClick={handleLogout}>
          Se déconnecter
        </Button>
      }
    />
  );

  return (
    <Box display="flex" justifyContent="center">
      {authenticated ? renderAuthenticated() : renderNotAuthenticated()}
      {renderConfirmDialog()}
    </Box>
  );
}
