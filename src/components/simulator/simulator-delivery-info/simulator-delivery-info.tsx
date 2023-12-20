import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { Box, Theme, SxProps, Tooltip } from '@mui/material';

import { useServiceState } from '../../../providers/service/service-provider';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SimulatorDeliveryInfo({ sx }: Props) {
  const { state, getBeautificationDays, getTotalDays, getDeliveryDate } = useServiceState();
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    setDeliveryDate(getDeliveryDate());
  }, [getDeliveryDate]);

  const getTooltipContent = (): React.JSX.Element => (
    <div className="">
      <Typography color="white" className="font-medium">
        Détails de livraison
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        {state.optionType.beautification ? (
          <>+ {getTotalDays() - getBeautificationDays()} jours (Relecture et correction)</>
        ) : (
          <>+ {getTotalDays()} jours (Relecture et correction)</>
        )}
      </Typography>
      {state.optionType.beautification && (
        <Typography variant="body2" color="green" className="font-normal opacity-80">
          + {getBeautificationDays()} jours (Embellissement)
        </Typography>
      )}
    </div>
  );

  return (
    <Tooltip title={getTooltipContent()}>
      <Box sx={{ ...sx, textAlign: 'center' }}>
        <Typography variant="body1">Livraison avant le:</Typography>
        {deliveryDate && <Typography variant="h4">{deliveryDate}</Typography>}
      </Box>
    </Tooltip>
  );
}
