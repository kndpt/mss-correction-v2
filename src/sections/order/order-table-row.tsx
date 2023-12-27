import { format } from 'date-fns';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';
import { getOrderStatus, getOrderStatusChipColor } from 'src/utils/order';

import Label from 'src/components/label';

import { IOrder } from 'src/types/order';

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
  const {
    status,
    displayName,
    email,
    endDate,
    purchaseTimestamp,
    service: { price, title, wordsValue },
  } = row;

  const renderPrimary = (
    <TableRow hover>
      <TableCell>
        <Box onClick={onViewRow} sx={{ ...clickable }}>
          {title}
        </Box>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={displayName} sx={{ mr: 2 }} onClick={onViewRow} />

        <ListItemText
          onClick={onViewRow}
          primary={displayName}
          secondary={email}
          primaryTypographyProps={{
            typography: 'body2',
            sx: { ...clickable },
          }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          onClick={onViewRow}
          primary={format(purchaseTimestamp.toDate(), 'dd MMM yyyy')}
          secondary={format(purchaseTimestamp.toDate(), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true, sx: { ...clickable } }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          onClick={onViewRow}
          primary={format(endDate.toDate(), 'dd MMM yyyy')}
          secondary={format(endDate.toDate(), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true, sx: { ...clickable } }}
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
        <Label
          variant="soft"
          color={getOrderStatusChipColor(status)}
          onClick={onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {getOrderStatus(status).toUpperCase()}
        </Label>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
