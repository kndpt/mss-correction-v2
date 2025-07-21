'use client';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Stack, Avatar, useTheme, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useConversionStatus } from 'src/hooks/use-conversion-status';

import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFreeSamplesList } from 'src/firestore/hooks/useFreeSamplesList';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import ConversionIndicator from 'src/components/conversion-indicator';
import LoadingComponent from 'src/components/loading/LoadingComponent';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import { IFreeSample } from 'src/types/free-sample';

import FreeSampleTableRow from '../free-sample-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: 'Client & Texte' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'correctionType', label: 'Type' },
  { id: 'source', label: 'Source' },
  { id: 'userConversion', label: 'Utilisateur', width: 80 },
  { id: 'clientConversion', label: 'Client', width: 80 },
  { id: 'status', label: 'Statut', width: 110 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

interface FreeSampleMobileCardProps {
  sample: IFreeSample;
  onViewRow: (id: string) => void;
}

function FreeSampleMobileCard({ sample, onViewRow }: FreeSampleMobileCardProps) {
  const theme = useTheme();
  const { isUser, isClient, loading: conversionLoading } = useConversionStatus(sample.email);

  return (
    <Card
      sx={{
        mb: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
      onClick={() => onViewRow(sample.id!)}
    >
      <Box sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          {/* Header avec email et statut */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1, mr: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {sample.email}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                {sample.text.substring(0, 80)}...
              </Typography>
            </Box>
            <Label
              variant="soft"
              color={sample.status === 'completed' ? 'success' : 'warning'}
              sx={{ flexShrink: 0, height: 22 }}
            >
              {sample.status === 'completed' ? 'TERMINÉ' : 'EN ATTENTE'}
            </Label>
          </Stack>

          {/* Client info avec avatar */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                {sample.email.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                  {sample.correctionType}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                  {sample.source}
                </Typography>
              </Box>
            </Stack>

            {/* Conversion indicators */}
            <Stack direction="row" spacing={1} alignItems="center">
              <ConversionIndicator
                converted={isUser}
                loading={conversionLoading}
                tooltip={isUser ? 'Utilisateur inscrit' : 'Pas encore inscrit'}
                type="user"
              />
              <ConversionIndicator
                converted={isClient}
                loading={conversionLoading}
                tooltip={isClient ? 'Client avec commande(s)' : 'Aucune commande'}
                type="client"
              />
            </Stack>
          </Stack>

          {/* Date compacte */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pt: 0.5 }}>
            <Iconify icon="solar:calendar-outline" width={14} />
            <Typography variant="caption" color="text.secondary">
              {new Date(sample.createdAt.seconds * 1000).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}

export default function FreeSamplesListView() {
  const isAdmin = useIsAdmin();
  const { freeSamples, loading, error } = useFreeSamplesList();
  const table = useTable({ defaultOrderBy: 'createdAt', defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const router = useRouter();

  // Mobile responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.freeSamples.details(id));
    },
    [router]
  );

  // redirect to home page
  if (!isAdmin) {
    router.push(paths.home);
  }

  if (error) return <div>Error: {error}</div>;

  const buildCardContent = () => {
    if (loading) return <LoadingComponent />;
    if (!freeSamples || freeSamples.length === 0) {
      return <EmptyContent title="Aucun échantillon gratuit" />;
    }

    const paginatedSamples = freeSamples.slice(
      table.page * table.rowsPerPage,
      table.page * table.rowsPerPage + table.rowsPerPage
    );

    if (isMobile) {
      // Vue mobile : cartes
      return (
        <Box>
          {paginatedSamples.map((sample) => (
            <FreeSampleMobileCard key={sample.id} sample={sample} onViewRow={handleViewRow} />
          ))}
          <TablePaginationCustom
            count={freeSamples.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Box>
      );
    }

    // Vue desktop : table
    return (
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {paginatedSamples.map((row) => (
                  <FreeSampleTableRow
                    key={row.id}
                    row={row}
                    onViewRow={() => handleViewRow(row.id!)}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={freeSamples.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    );
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ my: { xs: 3, md: 5 } }}>
        <Typography variant="h4">Échantillons gratuits</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Gérez tous les échantillons de correction gratuits soumis par les clients.
        </Typography>
      </Box>

      {buildCardContent()}
    </Container>
  );
}
