import Box from '@mui/material/Box';

import CorrectionMemoireView from 'src/sections/correction-memoire/view';

export default function CorrectionMemoirePage() {
  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      <CorrectionMemoireView />;
    </Box>
  );
}
