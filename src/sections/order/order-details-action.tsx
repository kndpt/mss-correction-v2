import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import useIsAdmin from 'src/auth/hooks/use-is-admin';

import Iconify from 'src/components/iconify/iconify';

import { IOrder, EOrderStatus } from 'src/types/order';

type Props = {
  order: IOrder;
  handleUpdateOrderStatus: () => Promise<void>;
  handleResetOrder: () => void;
  handleOpenUploadFile: () => void;
};

export default function OrderDetailsAction({
  order,
  handleUpdateOrderStatus,
  handleResetOrder,
  handleOpenUploadFile,
}: Props) {
  const isAdmin = useIsAdmin();

  return (
    isAdmin && (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<Iconify icon="ic:round-plus" />}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          '& .MuiSpeedDial-fab': {
            backgroundColor: '#212B36',
          },
        }}
      >
        {order.status === EOrderStatus.PAID && (
          <SpeedDialAction
            key="1"
            icon={<Iconify icon="solar:file-download-bold" />}
            title="Valider la commande"
            onClick={handleUpdateOrderStatus}
          />
        )}
        {order.status === EOrderStatus.IN_PROGRESS && (
          <SpeedDialAction
            key="2"
            icon={<Iconify icon="solar:check-read-linear" />}
            title="Terminer la commande"
            onClick={handleOpenUploadFile}
          />
        )}
        {order.status === EOrderStatus.DONE && (
          <SpeedDialAction
            key="3"
            icon={<Iconify icon="solar:rewind-back-line-duotone" />}
            title="Réinitialiser la commande"
            onClick={handleResetOrder}
          />
        )}
      </SpeedDial>
    )
  );
}
