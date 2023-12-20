import React from 'react';

import { Container, CircularProgress } from '@mui/material';

export default function LoadingComponent() {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100wh',
      }}
    >
      <CircularProgress color="primary" />
    </Container>
  );
}
