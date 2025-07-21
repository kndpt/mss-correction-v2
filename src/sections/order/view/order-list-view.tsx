'use client';

import React, { useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {
  Fab,
  Menu,
  Chip,
  Stack,
  Button,
  Avatar,
  MenuItem,
  useTheme,
  Typography,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { getOrderStatus, getOrderStatusChipColor } from 'src/utils/order';

import { sendAiScanFile } from 'src/api/backend-ai';
import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFirestoreOrders } from 'src/firestore/hooks/useFirestoreOrders';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import OrderTableRow from '../order-table-row';
import { IOrder, EOrderStatus } from '../../../types/order';
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
  const table = useTable({ defaultOrderBy: 'endAt', defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { enqueueSnackbar } = useSnackbar();

  // Mobile menu state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(anchorEl);

  // Filter state - "En cours" par défaut
  const [activeFilter, setActiveFilter] = React.useState<string>('in_progress');

  const handleGoToService = useCallback((): void => {
    router.push(paths.service);
  }, [router]);

  const handleGoToManualOrder = useCallback((): void => {
    router.push(paths.dashboard.order.manual);
  }, [router]);

  const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMobileAction = useCallback(
    (action: () => void) => {
      action();
      handleMobileMenuClose();
    },
    [handleMobileMenuClose]
  );

  // Filter logic
  const filterOptions = React.useMemo(
    () => [
      {
        id: 'all',
        label: 'Tout',
        color: 'default' as const,
        count: orders?.length || 0,
      },
      {
        id: 'in_progress',
        label: 'En cours',
        color: 'primary' as const,
        count:
          orders?.filter(
            (order) =>
              order.status === EOrderStatus.IN_PROGRESS || order.status === EOrderStatus.PAID
          ).length || 0,
      },
      {
        id: 'done',
        label: 'Terminé',
        color: 'success' as const,
        count: orders?.filter((order) => order.status === EOrderStatus.DONE).length || 0,
      },
      {
        id: 'pending',
        label: 'Non payé',
        color: 'warning' as const,
        count: orders?.filter((order) => order.status === EOrderStatus.PENDING).length || 0,
      },
    ],
    [orders]
  );

  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];

    switch (activeFilter) {
      case 'in_progress':
        return orders.filter(
          (order) => order.status === EOrderStatus.IN_PROGRESS || order.status === EOrderStatus.PAID
        );
      case 'done':
        return orders.filter((order) => order.status === EOrderStatus.DONE);
      case 'pending':
        return orders.filter((order) => order.status === EOrderStatus.PENDING);
      case 'all':
      default:
        return orders;
    }
  }, [orders, activeFilter]);

  const handleFilterChange = useCallback(
    (filterId: string) => {
      setActiveFilter(filterId);
      table.onChangePage(null, 0); // Reset to first page when filter changes
    },
    [table]
  );

  // Utility function to safely format price
  const formatPrice = useCallback((price: string | number | undefined): string => {
    if (!price) return '0.00';
    const numPrice = typeof price === 'number' ? price : parseFloat(price.toString());
    return Number.isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  }, []);

  const getInProgressIncomePrice = useCallback(() => {
    if (!orders) return '0.00';

    const total = orders.reduce((acc, order) => {
      if (order.status === EOrderStatus.IN_PROGRESS) {
        const price =
          typeof order.service.price === 'number'
            ? order.service.price
            : parseFloat(order.service.price || '0');
        return acc + (Number.isNaN(price) ? 0 : price);
      }
      return acc;
    }, 0);

    return formatPrice(total);
  }, [orders, formatPrice]);

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
    (row: IOrder) => {
      // Use order ID for pending orders without intent, otherwise use intent
      const identifier = row.intent || row.id;
      if (!identifier) return;
      router.push(paths.dashboard.order.details(identifier));
    },
    [router]
  );

  const getTimeProgress = useCallback((order: IOrder) => {
    if (!order.purchaseTimestamp || !order.endDate) {
      return { progress: 0, isOverdue: false, timeLeft: '', progressColor: 'primary' as const };
    }

    const startTime = order.purchaseTimestamp.toDate().getTime();
    const endTime = order.endDate.toDate().getTime();
    const currentTime = new Date().getTime();

    const totalDuration = endTime - startTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(Math.max((elapsedTime / totalDuration) * 100, 0), 100);

    const isOverdue = currentTime > endTime;
    const timeLeft = Math.abs(endTime - currentTime);
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    let timeLeftText = '';
    if (isOverdue) {
      timeLeftText = `En retard de ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`;
    } else if (daysLeft === 0) {
      const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
      timeLeftText = `${hoursLeft}h restante${hoursLeft > 1 ? 's' : ''}`;
    } else {
      timeLeftText = `${daysLeft} jour${daysLeft > 1 ? 's' : ''} restant${daysLeft > 1 ? 's' : ''}`;
    }

    let progressColor: 'primary' | 'warning' | 'error' = 'primary';
    if (isOverdue) {
      progressColor = 'error';
    } else if (progress > 75) {
      progressColor = 'warning';
    }

    return { progress, isOverdue, timeLeft: timeLeftText, progressColor };
  }, []);

  const OrderMobileCard = useCallback(
    (props: { order: IOrder }) => {
      const { order } = props;
      const timeProgress = getTimeProgress(order);
      const showProgress =
        isAdmin &&
        (order.status === EOrderStatus.IN_PROGRESS || order.status === EOrderStatus.PAID);

      const isPending = order.status === EOrderStatus.PENDING;
      const isClickable = !isPending;

      return (
        <Card
          sx={{
            mb: 1.5,
            cursor: isClickable ? 'pointer' : 'default',
            transition: 'all 0.2s',
            opacity: isPending ? 0.7 : 1,
            '&:hover': isClickable
              ? {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                }
              : {},
          }}
          onClick={isClickable ? () => handleViewRow(order) : undefined}
        >
          <Box sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {/* Header avec titre et statut */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1, mr: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {order.service?.title || 'Sans titre'}
                  </Typography>
                  {isPending && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
                    >
                      <Iconify icon="solar:info-circle-outline" width={12} />
                      Paiement requis pour accéder aux détails
                    </Typography>
                  )}
                </Box>
                <Label
                  variant="soft"
                  color={getOrderStatusChipColor(order.status)}
                  sx={{ flexShrink: 0, height: 22 }}
                >
                  {getOrderStatus(order.status).toUpperCase()}
                </Label>
              </Stack>

              {/* Client info + Prix */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.875rem' }}
                  >
                    {order.displayName?.charAt(0)?.toUpperCase() ||
                      order.email?.charAt(0)?.toUpperCase() ||
                      'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                      {order.displayName || 'Client'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                      {order.email?.substring(0, 20)}
                      {order.email && order.email.length > 20 ? '...' : ''}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {formatPrice(order.service?.price)}€
                </Typography>
              </Stack>

              {/* Progress bar pour admin uniquement */}
              {showProgress && (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Progression
                    </Typography>
                    <Typography
                      variant="caption"
                      color={timeProgress.isOverdue ? 'error.main' : 'text.secondary'}
                      sx={{ fontWeight: 500 }}
                    >
                      {timeProgress.timeLeft}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={timeProgress.progress}
                    color={timeProgress.progressColor}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.200',
                    }}
                  />
                </Box>
              )}

              {/* Informations compactes en ligne */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 0.5 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon="solar:document-text-outline" width={14} />
                    <Typography variant="caption" color="text.secondary">
                      {order.service?.wordsValue || 0} mots
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon="solar:calendar-outline" width={14} />
                    <Typography variant="caption" color="text.secondary">
                      {order.purchaseTimestamp?.toDate().toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                      }) || '-'}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="solar:clock-circle-outline" width={14} />
                  <Typography variant="caption" color="text.secondary">
                    {order.endDate?.toDate().toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                    }) || '-'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Card>
      );
    },
    [theme.shadows, handleViewRow, getTimeProgress, isAdmin, formatPrice]
  );

  if (error) return <div>Error: {error}</div>;

  const buildCardContent = () => {
    if (loading) return <LoadingComponent />;
    if (!orders) return null;
    if (!loading && orders.length < 1) return <EmptyContent title="Pas de commande" />;
    if (!loading && filteredOrders.length < 1) {
      const emptyMessage =
        activeFilter === 'pending'
          ? 'Aucune commande en attente de paiement'
          : 'Aucune commande pour ce filtre';
      return <EmptyContent title={emptyMessage} />;
    }

    const paginatedOrders = filteredOrders.slice(
      table.page * table.rowsPerPage,
      table.page * table.rowsPerPage + table.rowsPerPage
    );

    if (isMobile) {
      // Vue mobile : cartes
      return (
        <Box>
          {paginatedOrders.map((order) => (
            <OrderMobileCard key={order.id} order={order} />
          ))}
          <TablePaginationCustom
            count={filteredOrders.length}
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
                {paginatedOrders.map((row) => (
                  <OrderTableRow key={row.id} row={row} onViewRow={() => handleViewRow(row)} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={filteredOrders.length}
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

        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            {isAdmin && (
              <>
                <Button
                  startIcon={<Iconify icon="f7:wand-stars-inverse" />}
                  color="primary"
                  variant="contained"
                  sx={{
                    height: 40,
                    background: 'linear-gradient(to right bottom, #2A00D4, #CE00AD)',
                  }}
                  onClick={onTrue}
                >
                  Analyser un document
                </Button>

                <Button
                  startIcon={<Iconify icon="solar:settings-minimalistic-outline" />}
                  color="secondary"
                  variant="contained"
                  sx={{ height: 40 }}
                  onClick={handleGoToManualOrder}
                >
                  Créer commande manuelle
                </Button>
              </>
            )}

            {!isAdmin && (
              <Button
                startIcon={<Iconify icon="solar:pen-new-square-linear" />}
                color="inherit"
                variant="contained"
                sx={{ height: 40 }}
                onClick={handleGoToService}
              >
                Nouvelle correction
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* Filter badges */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {filterOptions.map((filter) => (
            <Chip
              key={filter.id}
              label={`${filter.label} (${filter.count})`}
              onClick={() => handleFilterChange(filter.id)}
              color={activeFilter === filter.id ? filter.color : 'default'}
              variant={activeFilter === filter.id ? 'filled' : 'outlined'}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {buildCardContent()}

      {/* Mobile FAB */}
      {isMobile && (
        <>
          <Fab
            color="primary"
            aria-label="actions"
            onClick={handleMobileMenuOpen}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Iconify icon="solar:add-circle-linear" />
          </Fab>

          <Menu
            anchorEl={anchorEl}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            PaperProps={{
              sx: {
                minWidth: 200,
                mb: 1,
              },
            }}
          >
            {isAdmin && [
              <MenuItem key="analyze" onClick={() => handleMobileAction(onTrue)}>
                <ListItemIcon>
                  <Iconify icon="f7:wand-stars-inverse" width={20} />
                </ListItemIcon>
                <ListItemText primary="Analyser un document" />
              </MenuItem>,
              <MenuItem key="manual" onClick={() => handleMobileAction(handleGoToManualOrder)}>
                <ListItemIcon>
                  <Iconify icon="solar:settings-minimalistic-outline" width={20} />
                </ListItemIcon>
                <ListItemText primary="Créer commande manuelle" />
              </MenuItem>,
            ]}

            {!isAdmin && (
              <MenuItem onClick={() => handleMobileAction(handleGoToService)}>
                <ListItemIcon>
                  <Iconify icon="solar:pen-new-square-linear" width={20} />
                </ListItemIcon>
                <ListItemText primary="Nouvelle correction" />
              </MenuItem>
            )}
          </Menu>
        </>
      )}

      <FileManagerUploadFile
        open={value}
        onClose={onFalse}
        handleSendFile={onSendFile}
        title="Analyser le fichier corrigé avec l'IA"
      />
    </Container>
  );
}
