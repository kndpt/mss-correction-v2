import { Box, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

interface CorrectionNotesProps {
  notes: string;
}

export default function CorrectionNotes({ notes }: CorrectionNotesProps) {
  if (!notes) return null;

  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 1,
        border: '1px dashed',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Iconify
          icon="mdi:note-text-outline"
          sx={{
            color: 'primary.main',
            width: 24,
            height: 24,
            mr: 1,
          }}
        />
        <Typography variant="subtitle1" fontWeight="bold">
          Notes du correcteur
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontStyle: 'italic',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.7,
        }}
      >
        {notes}
      </Typography>
    </Box>
  );
}
