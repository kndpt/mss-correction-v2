'use client';

import { useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useFirestoreOrders } from 'src/firestore/hooks/useFirestoreOrders';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import OrderTableRow from '../order-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Titre' },
  { id: 'name', label: 'Client' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'endAt', label: 'Prévue', width: 140 },
  { id: 'words', label: 'Mots' },
  { id: 'totalAmount', label: 'Price' },
  { id: 'status', label: 'Status', width: 110 },
];

// ----------------------------------------------------------------------

export default function OrderListView() {
  const { orders, loading, error } = useFirestoreOrders();
  const table = useTable({ defaultOrderBy: 'endAt' });
  const settings = useSettingsContext();
  const router = useRouter();

  const handleGoToService = useCallback((): void => {
    router.push(paths.service);
  }, [router]);

  const handleViewRow = useCallback(
    (id: string) => {
      if(!id) return;
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );
  if (error) return <div>Error: {error}</div>;

  const buildCardContent = () => {
    if (loading) <LoadingComponent />;
    if (!orders) return;
    if (!loading && orders.length < 1) return <EmptyContent title="Pas de commande" />;

    return (
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {!loading &&
                  orders &&
                  orders.length > 0 &&
                  orders
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        onViewRow={() => handleViewRow(row.intent)}
                      />
                    ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={orders.length}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h4">Hello, Bienvenue 👋</Typography>
          <Typography variant="body2">
            Vous trouverez ici la liste de vos corrections en cours et terminées.
          </Typography>
        </Box>

        <Button
          startIcon={<Iconify icon="solar:pen-new-square-linear" />}
          color="primary"
          variant="contained"
          sx={{ height: 40 }}
          onClick={handleGoToService}
        >
          Nouvelle correction
        </Button>
      </Box>

      {buildCardContent()}
    </Container>
  );
}
