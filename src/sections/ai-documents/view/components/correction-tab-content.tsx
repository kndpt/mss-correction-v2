import React from 'react';

import { Box, Typography } from '@mui/material';

import { IAiDocumentCorrection } from 'src/types/ai-document';

import CorrectionTable from './correction-table';

// ----------------------------------------------------------------------

type CorrectionTabContentProps = {
  corrections: IAiDocumentCorrection[] | undefined;
  emptyMessage: string;
  title: string;
  subtitle: string;
};

export default function CorrectionTabContent({
  corrections,
  emptyMessage,
  title,
  subtitle,
}: CorrectionTabContentProps) {
  if (!corrections || corrections.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="subtitle1">{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <CorrectionTable corrections={corrections} />
    </>
  );
}
