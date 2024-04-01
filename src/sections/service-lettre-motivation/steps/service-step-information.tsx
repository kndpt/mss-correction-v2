import { Box, TextField } from '@mui/material';

import { useServiceState, useServiceDispatch } from 'src/providers/service/service-provider';

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
        <TextField
          variant="filled"
          fullWidth
          label="Indiquez ce que vous attendez de la correction (facultatif)"
          // sublabel="Je serai en mesure de mieux comprendre votre sujet et vos attentes."
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
