'use client';

import {
  Box,
  Link,
  Stack,
  Button,
  Dialog,
  Tooltip,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
} from '@mui/material';

import Image from 'src/components/image';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  giftMessage: string;
  reviewText: string;
  onChangeReviewText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendReview: () => void;
};

export default function ReviewDialog({
  open,
  onClose,
  giftMessage,
  reviewText,
  onChangeReviewText,
  onSendReview,
}: Props) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Merci pour votre commande !</DialogTitle>

      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Tooltip title={giftMessage} arrow>
          <Image alt="cadeau" src="/assets/images/cadeau.png" sx={{ width: 100 }} />
        </Tooltip>
      </Box>
      <Box sx={{ width: '100%', textAlign: 'center', mb: 6 }}>
        <Typography variant="caption">Touchez pour voir le cadeau</Typography>
      </Box>

      <Stack spacing={3} sx={{ px: 3, textAlign: 'center' }}>
        <Typography variant="body1">
          Laissez un avis sur{' '}
          <Link href="https://fr.trustpilot.com/review/msscorrection.fr" target="_blank">
            Trustpilot
          </Link>{' '}
          et recevez une surprise après validation ! 🎁
        </Typography>
        <Typography variant="body1">Ou donnez votre avis ici (sans cadeau) :</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Votre avis..."
          value={reviewText}
          onChange={onChangeReviewText}
        />
        <Typography variant="body1">Merci pour votre confiance !</Typography>
      </Stack>

      <DialogActions>
        <Button onClick={onClose}>Passer</Button>

        <Button
          variant="contained"
          onClick={() => {
            window.open('https://fr.trustpilot.com/review/msscorrection.fr', '_blank');
          }}
          sx={{
            background: '#007f4e',
            ':hover': {
              background: '#00673f',
            },
          }}
        >
          Laisser un avis Trustpilot
        </Button>

        <Button variant="contained" onClick={onSendReview}>
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
