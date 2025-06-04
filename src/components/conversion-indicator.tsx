import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  converted: boolean;
  loading?: boolean;
  tooltip: string;
  type: 'user' | 'client';
};

export default function ConversionIndicator({ converted, loading, tooltip, type }: Props) {
  if (loading) {
    return (
      <IconButton size="small" disabled>
        <Iconify icon="line-md:loading-loop" width={16} />
      </IconButton>
    );
  }

  const icon = type === 'user' ? 'solar:user-check-bold' : 'solar:cart-check-bold';
  const color = converted ? 'success.main' : 'text.disabled';

  return (
    <Tooltip title={tooltip}>
      <IconButton
        size="small"
        sx={{
          color,
          ...(converted && {
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }),
        }}
      >
        <Iconify icon={icon} width={16} />
      </IconButton>
    </Tooltip>
  );
}
