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
    </Box>
  );
}
