import { Box, TextField, Typography } from '@mui/material';

import { useServiceState, useServiceDispatch } from '../providers/service-provider';

// ----------------------------------------------------------------------

export default function ServiceStepInformation() {
  const dispatch = useServiceDispatch();
  const { state: service } = useServiceState();

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          py: 2,
          width: {
            md: 1 / 2,
            xs: 1,
            xl: 1 / 3,
          },
        }}
      >
        <Typography>Lettre de motivation récupérée !</Typography>
        <TextField
          variant="filled"
          fullWidth
          label="Indique ce que tu attends de ce service (facultatif)"
          multiline
          maxRows={4}
          value={service.informations}
          onChange={(e) => dispatch({ type: 'setInformations', payload: e.target.value })}
          sx={{ mt: 4 }}
          placeholder="Je souhaite que ma lettre de motivation soit plus dynamique et plus adaptée à mon profil."
        />
      </Box>
    </Box>
  );
}
