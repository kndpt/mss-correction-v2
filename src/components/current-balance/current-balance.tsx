import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

import { paths } from 'src/routes/paths';

import Iconify from '../iconify/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
}

export default function CurrentBalance({ title, sx, ...other }: Props) {
  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">0.004€/mot</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption">Exemples de tarification pour votre roman :</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            25 000 mots
          </Typography>
          <Typography variant="body2">100€ TTC</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            45 000 mots
          </Typography>
          <Typography variant="body2">180€ TTC</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            65 000 mots
          </Typography>
          <Typography variant="body2">260€ TTC</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:cart-large-linear" />}
            href={`${paths.service}`}
          >
            Commander
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
