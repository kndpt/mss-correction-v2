import React from 'react';

import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type DocumentHeaderProps = {
  documentName: string;
  totalCost: number;
};

export default function DocumentHeader({ documentName, totalCost }: DocumentHeaderProps) {
  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4">{documentName}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'right', mr: 2 }}>
          <Typography variant="h4">{totalCost} €</Typography>
          <Typography variant="caption" color="text.secondary">
            Coût total
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
