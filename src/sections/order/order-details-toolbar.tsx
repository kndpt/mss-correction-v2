import { useState } from 'react';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'src/utils/format-time';
import { getOrderStatus, getOrderStatusChipColor } from 'src/utils/order';

import useIsAdmin from 'src/auth/hooks/use-is-admin';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { EOrderStatus } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  status: EOrderStatus;
  backLink: string;
  fixedPath?: string;
  orderNumber: string;
  createdAt: Date;
  handleDownloadFile: (path: string) => Promise<void>;
  displayName: string;
};

export default function OrderDetailsToolbar({
  status,
  backLink,
  createdAt,
  orderNumber,
  handleDownloadFile,
  fixedPath,
  displayName,
}: Props) {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const isAdmin = useIsAdmin();

  const _handleDownloadFile = async () => {
    setDownloadLoading(true);
    if (!fixedPath) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await handleDownloadFile(fixedPath);
    setDownloadLoading(false);
  };

  return (
    <Stack
      spacing={3}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <IconButton href={backLink}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4">
              {isAdmin && 'Admin - '} Commande #
              {orderNumber.substring(orderNumber.length, orderNumber.length - 4).toUpperCase()}
            </Typography>
            <Label variant="soft" color={getOrderStatusChipColor(status)}>
              {getOrderStatus(status).toUpperCase()}
            </Label>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {!isAdmin && `${displayName} - `} {fDateTime(createdAt)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        flexGrow={1}
        spacing={1.5}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          disabled
        >
          Imprimer
        </Button>
        {fixedPath && (
          <LoadingButton
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="solar:file-download-bold" />}
            onClick={_handleDownloadFile}
            loading={downloadLoading}
          >
            Télécharger la correction
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
}
