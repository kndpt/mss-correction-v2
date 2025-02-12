import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box, Theme, SxProps } from '@mui/material';

import { IOptionType } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  wordsPrice: string;
  wordsValue: number;
  number: number;
  options: IOptionType;
};

export default function SimulatorSummaryInfo({
  sx,
  number,
  options,
  wordsPrice,
  wordsValue,
}: Props) {
  const price = parseFloat(wordsPrice);
  const showKlarnaPayment = price >= 50;

  return (
    <Box sx={{ ...sx, textAlign: 'center' }}>
      <Typography variant="body1">Récapitulatif</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Typography variant="h3">{`${wordsPrice}€`}</Typography>
        <Typography variant="body2">TTC</Typography>
      </Box>
      <Typography className="mt-5" variant="body1" sx={{ pb: 1 }}>
        {`- ${wordsValue} mots`}
      </Typography>
      <Typography className="mt-5" variant="body1" sx={{ pb: 1 }}>
        {`- ${number} jours`}
      </Typography>
      <Typography className="mt-5" variant="body1" sx={{ pb: 1 }}>
        - Relecture et correction
      </Typography>
      {options.beautification && (
        <Typography className="mt-5" variant="body1" sx={{ pb: 1 }}>
          - Embellissement
        </Typography>
      )}
      {showKlarnaPayment && (
        <Box
          sx={{ mt: 2, p: 1.5, bgcolor: 'primary.lighter', borderRadius: 1, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              bgcolor: 'error.main',
              color: 'error.contrastText',
              px: 1,
              py: 0.5,
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            NOUVEAU
          </Box>
          <Link
            href="https://www.klarna.com/fr/"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              display: 'block',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            Payez en 2, 3 ou 4 fois avec Klarna
          </Link>
          <Typography variant="body2" sx={{ mt: 1, color: 'primary.main.light' }}>
            Moyen de paiement disponible à la dernière étape.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
