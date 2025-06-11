import { format } from 'date-fns';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { useRetryPayment } from 'src/hooks/use-retry-payment';

import { fCurrency } from 'src/utils/format-number';
import { getOrderStatus, getOrderStatusChipColor } from 'src/utils/order';

import useIsAdmin from 'src/auth/hooks/use-is-admin';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { IOrder, EOrderStatus } from 'src/types/order';

const clickable = {
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};

// ----------------------------------------------------------------------

type Props = {
  row: IOrder;
  onViewRow: VoidFunction;
};

export default function OrderTableRow({ row, onViewRow }: Props) {
  const { retryPayment, isProcessing } = useRetryPayment();
  const isAdmin = useIsAdmin();

  const {
    status,
    displayName,
    email,
    endDate,
    purchaseTimestamp,
    service: { price, title, wordsValue },
  } = row;

  const purchaseTimestampDate = purchaseTimestamp ? purchaseTimestamp.toDate() : new Date();
  const endDateDate = endDate ? endDate.toDate() : new Date();

  const isOrderPending = status === EOrderStatus.PENDING && !row.intent;
  const isOrderClickable = !isOrderPending;
  const showRetryButton = isOrderPending && !isAdmin;

  const handleRetryPayment = () => retryPayment(row);

  const renderPrimary = (
    <TableRow hover>
      <TableCell>
        <Box
          onClick={isOrderClickable ? onViewRow : undefined}
          sx={{ ...(isOrderClickable ? clickable : {}) }}
        >
          {title}
        </Box>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={displayName}
          sx={{ mr: 2 }}
          onClick={isOrderClickable ? onViewRow : undefined}
        />

        <ListItemText
          onClick={isOrderClickable ? onViewRow : undefined}
          primary={displayName}
          secondary={email}
          primaryTypographyProps={{
            typography: 'body2',
            sx: { ...(isOrderClickable ? clickable : {}) },
          }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          onClick={isOrderClickable ? onViewRow : undefined}
          primary={format(purchaseTimestampDate, 'dd MMM yyyy')}
          secondary={format(purchaseTimestampDate, 'p')}
          primaryTypographyProps={{
            typography: 'body2',
            noWrap: true,
            sx: { ...(isOrderClickable ? clickable : {}) },
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          onClick={isOrderClickable ? onViewRow : undefined}
          primary={format(endDateDate, 'dd MMM yyyy')}
          secondary={format(endDateDate, 'p')}
          primaryTypographyProps={{
            typography: 'body2',
            noWrap: true,
            sx: { ...(isOrderClickable ? clickable : {}) },
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center"> {wordsValue} </TableCell>

      <TableCell> {fCurrency(price)} </TableCell>

      <TableCell>
        {showRetryButton ? (
          <Button
            variant="contained"
            size="small"
            disabled={isProcessing}
            startIcon={
              isProcessing ? (
                <Iconify icon="svg-spinners:8-dots-rotate" />
              ) : (
                <Iconify icon="solar:card-2-broken" />
              )
            }
            onClick={handleRetryPayment}
            sx={{ minWidth: 140 }}
          >
            {isProcessing ? 'Traitement...' : 'Finaliser'}
          </Button>
        ) : (
          <Label
            variant="soft"
            color={getOrderStatusChipColor(status)}
            onClick={isOrderClickable ? onViewRow : undefined}
            sx={{ cursor: isOrderClickable ? 'pointer' : 'default' }}
          >
            {getOrderStatus(status).toUpperCase()}
          </Label>
        )}
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
