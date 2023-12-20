import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { Box, Theme, Button, SxProps, Tooltip } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  handleOrder: () => Promise<void>;
  handleContact: () => void;
  orderText?: string;
  disabled: boolean;
};

export default function SimulatorCallToAction({
  disabled,
  handleContact,
  handleOrder,
  orderText = 'Commander',
  sx,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    // if is already loading, do nothing
    if (isLoading) return;

    setIsLoading(true);
    // event("button_click", { label: "go_to_services" });
    await handleOrder();
    setIsLoading(false);
  };

  const onClickContact = () => {
    handleContact();
  };

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        <Tooltip
          placement="top"
          color="lightBlue"
          title={disabled ? 'La commande doit être supérieur à 0.50€' : null}
        >
          <Button
            color="inherit"
            onClick={onClickOrder}
            disabled={disabled}
            variant="contained"
            startIcon={<Iconify icon="solar:cart-large-linear" />}
          >
            {orderText}
          </Button>
        </Tooltip>

        <Button
          color="inherit"
          variant="soft"
          onClick={onClickContact}
          startIcon={<Iconify icon="solar:chat-line-outline" />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Me contacter
        </Button>
      </Box>
      {isLoading && (
        <Typography variant="body2" className="text-center mt-2">
          Récupération de votre document..
        </Typography>
      )}
    </Box>
  );
}
