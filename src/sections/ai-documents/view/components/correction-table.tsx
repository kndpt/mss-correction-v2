import React from 'react';
import { useSnackbar } from 'notistack';

import {
  Card,
  Stack,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { IAiDocumentCorrection } from 'src/types/ai-document';

// ----------------------------------------------------------------------

type CorrectionTableProps = {
  corrections: IAiDocumentCorrection[];
};

export default function CorrectionTable({ corrections }: CorrectionTableProps) {
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyMistake = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        enqueueSnackbar('Texte copié dans le presse-papier', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Échec de la copie', { variant: 'error' });
      });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <TableContainer>
        <Scrollbar>
          <Table size="small">
            <TableBody>
              {corrections.map((correction, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.action.selected,
                      borderLeft: '3px solid #2196f3',
                    },
                    borderLeft: '3px solid transparent',
                  }}
                >
                  <TableCell
                    sx={{
                      width: '45%',
                      borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
                      p: { xs: 1.5, md: 2 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Tooltip title="Copier la faute">
                        <IconButton
                          size="small"
                          onClick={() => handleCopyMistake(correction.mistake)}
                          aria-label="copier dans le presse-papier"
                        >
                          <Iconify icon="solar:copy-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Typography
                        color="error"
                        variant="body2"
                        sx={{ fontWeight: 'medium', flex: 1 }}
                      >
                        {correction.mistake}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '55%',
                      borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
                      p: { xs: 1.5, md: 2 },
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {correction.correction}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}
