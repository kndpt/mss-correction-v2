'use client';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFreeSamplesList } from 'src/firestore/hooks/useFreeSamplesList';

import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

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

export default function FreeSamplesListView() {
  const isAdmin = useIsAdmin();
  const { freeSamples, loading, error } = useFreeSamplesList();
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const settings = useSettingsContext();
  const router = useRouter();

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

    return (
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {freeSamples
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
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
