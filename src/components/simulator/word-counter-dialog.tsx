import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  open: boolean;
  onClose: VoidFunction;
  handleSendWordsValue: (value: number) => void;
}

export default function WordCounterDialog({
  title = 'Ajouter le nombre de mots',
  open,
  onClose,
  handleSendWordsValue,
  ...other
}: Props) {
  const [words, setWords] = useState(0);

  const updateWordsValue = (value: string) => {
    if (value === '') {
      setWords(0);
      return;
    }

    if (value.length > 1 && value[0] === '0') {
      value = value.slice(1);
    }

    const intValue = parseInt(value, 10);
    setWords(intValue);
  };

  const onValidate = () => {
    handleSendWordsValue(words);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Nous n&apos;avons pas pu détecter le nombre de mots dans votre document. Merci de
            l&apos;indiquer ci-dessous.
          </Typography>
          <TextField
            fullWidth
            label="Nombre de mots"
            type="number"
            value={words}
            onChange={(e) => updateWordsValue(e.target.value)}
            sx={{ mb: 3 }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="soft" color="inherit" onClick={onValidate}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
