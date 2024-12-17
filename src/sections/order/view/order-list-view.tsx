'use client';

import React, { useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { sendAiScanFile } from 'src/api/backend-ai';
import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFirestoreOrders } from 'src/firestore/hooks/useFirestoreOrders';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import OrderTableRow from '../order-table-row';
import { EOrderStatus } from '../../../types/order';
import FileManagerUploadFile from '../components/file-manager-upload-file';

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
  const { value, onFalse, onTrue } = useBoolean();
  const table = useTable({ defaultOrderBy: 'endAt' });
  const settings = useSettingsContext();
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { enqueueSnackbar } = useSnackbar();

  const handleGoToService = useCallback((): void => {
    router.push(paths.service);
  }, [router]);

  const getInProgressIncomePrice = useCallback(() => {
    if (!orders) return '0.00';

    const total = orders.reduce((acc, order) => {
      if (order.status === EOrderStatus.IN_PROGRESS) {
        return acc + order.service.price;
      }
      return acc;
    }, 0);

    return total.toFixed(2);
  }, [orders]);

  const onSendFile = useCallback(
    async (file: File) => {
      if (!file) return;
      try {
        const response = await sendAiScanFile(file);
        enqueueSnackbar(response.message, {
          variant: 'success',
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          autoHideDuration: 3000,
        });
      } catch {
        enqueueSnackbar("Erreur lors de l'envoi du fichier", {
          variant: 'error',
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          autoHideDuration: 3000,
        });
      } finally {
        onFalse();
      }
    },
    [enqueueSnackbar, onFalse]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      if (!id) return;
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            my: { xs: 3, md: 5 },
            paddingRight: {
              xs: 2,
              md: 0,
            },
          }}
        >
          <Typography variant="h4">Hello, Bienvenue 👋</Typography>
          {isAdmin ? (
            <Typography variant="body2">
              Vous trouverez ici la liste des commandes en cours et terminées (
              <b>{getInProgressIncomePrice()}</b> € en cours)
            </Typography>
          ) : (
            <Typography variant="body2">
              Vous trouverez ici la liste de vos corrections en cours et terminées.
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            paddingLeft: {
              xs: 2,
              md: 0,
            },
          }}
        >
          {isAdmin && (
            <Button
              startIcon={<Iconify icon="f7:wand-stars-inverse" />}
              color="primary"
              variant="contained"
              sx={{
                height: 40,
                marginBottom: {
                  xs: 1,
                  md: 0,
                },
                marginRight: {
                  xs: 0,
                  md: 2,
                },
                width: {
                  xs: '100%',
                  md: 'auto',
                },
                background: 'linear-gradient(to right bottom, #2A00D4, #CE00AD)',
              }}
              onClick={onTrue}
            >
              Analyser un document
            </Button>
          )}

          <Button
            startIcon={<Iconify icon="solar:pen-new-square-linear" />}
            color="inherit"
            variant="contained"
            sx={{
              height: 40,
              width: {
                xs: '100%',
                md: 'auto',
              },
            }}
            onClick={handleGoToService}
          >
            Nouvelle correction
          </Button>
        </Box>
      </Box>

      {buildCardContent()}
      <FileManagerUploadFile
        open={value}
        onClose={onFalse}
        handleSendFile={onSendFile}
        title="Analyser le fichier corrigé avec l'IA"
      />
    </Container>
  );
}
