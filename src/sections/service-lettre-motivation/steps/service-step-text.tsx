import { Box, TextField } from '@mui/material';

import { useServiceState, useServiceDispatch } from '../providers/service-provider';

// ----------------------------------------------------------------------

export default function ServiceStepText() {
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
        <TextField
          variant="filled"
          fullWidth
          label="Lettre de motivation (300 caractères minimum)"
          multiline
          maxRows={4}
          value={service.text}
          onChange={(e) => dispatch({ type: 'setText', payload: e.target.value })}
          sx={{ mt: 4 }}
          placeholder="Tu peux coller ta lettre de motivation ici."
        />
      </Box>
    </Box>
  );
}
