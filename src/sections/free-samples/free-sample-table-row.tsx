import { format } from 'date-fns';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useConversionStatus } from 'src/hooks/use-conversion-status';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ConversionIndicator from 'src/components/conversion-indicator';

import { IFreeSample } from 'src/types/free-sample';

// ----------------------------------------------------------------------

const clickable = {
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};

type Props = {
  row: IFreeSample;
  onViewRow: VoidFunction;
};

export default function FreeSampleTableRow({ row, onViewRow }: Props) {
  const { isUser, isClient, loading } = useConversionStatus(row.email);

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.email} sx={{ mr: 2 }} onClick={onViewRow}>
          {row.email.charAt(0).toUpperCase()}
        </Avatar>

        <ListItemText
          onClick={onViewRow}
          primary={row.email}
          secondary={`${row.text.substring(0, 50)}...`}
          primaryTypographyProps={{
            typography: 'body2',
            sx: clickable,
          }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <ListItemText
          onClick={onViewRow}
          primary={format(new Date(row.createdAt.seconds * 1000), 'dd MMM yyyy')}
          secondary={format(new Date(row.createdAt.seconds * 1000), 'p')}
          primaryTypographyProps={{
            typography: 'body2',
            noWrap: true,
            sx: clickable,
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{ ...clickable, color: 'text.secondary', typography: 'body2' }}
        >
          {row.correctionType}
        </Box>
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{ ...clickable, color: 'text.secondary', typography: 'body2' }}
        >
          {row.source}
        </Box>
      </TableCell>

      <TableCell align="center">
        <ConversionIndicator
          converted={isUser}
          loading={loading}
          tooltip={isUser ? 'Utilisateur inscrit' : 'Pas encore inscrit'}
          type="user"
        />
      </TableCell>

      <TableCell align="center">
        <ConversionIndicator
          converted={isClient}
          loading={loading}
          tooltip={isClient ? 'Client avec commande(s)' : 'Aucune commande'}
          type="client"
        />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={row.status === 'completed' ? 'success' : 'warning'}
          onClick={onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {row.status === 'completed' ? 'TERMINÉ' : 'EN ATTENTE'}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton onClick={onViewRow}>
          <Iconify icon="solar:eye-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
