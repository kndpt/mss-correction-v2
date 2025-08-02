'use client';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import { Box, Stack } from '@mui/system';
import Container from '@mui/material/Container';
import { Button, useTheme, useMediaQuery } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import { useFirestoreOrder } from 'src/firestore/hooks/useFirestoreOrder';
import { useFirestoreMessage } from 'src/firestore/hooks/useFirestoreMessage';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';

import { EOrderStatus } from 'src/types/order';

import ChatView from '../components/chat/chat-view';
import OrderHeader from '../components/order-header';
import OrderDetailsItems from '../order-details-item';
import ReviewDialog from '../components/review-dialog';
import { useOrderTabs } from '../hooks/use-order-tabs';
import ReviewButtons from '../components/review-buttons';
import OrderDetailsAction from '../order-details-action';
import OrderDetailsHistory from '../order-details-history';
import { useOrderHandlers } from '../hooks/use-order-handlers';
import FileManagerUploadFile from '../components/file-manager-upload-file';

// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const { order, loading, error } = useFirestoreOrder();
  const { messages } = useFirestoreMessage();
  const { user } = useAuthContext();
  const settings = useSettingsContext();

  // Responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Custom hooks
  const { currentTab, handleTabChange } = useOrderTabs();
  const {
    // State
    open,
    setOpen,
    confirmDialogOpen,
    setConfirmDialogOpen,
    reviewPopup,
    reviewText,

    // Computed values
    timeProgress,
    showProgress,
    giftMessage,

    // Handlers
    handleDownloadFile,
    handleSendReview,
    handleUpdateOrderStatus,
    handleResetOrder,
    handleSendFile,
    handleClose,
    onChangeReviewText,
  } = useOrderHandlers();

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <EmptyContent title="Commande introuvable" />;

  // Mobile Layout
  if (isMobile) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <OrderHeader
          order={order}
          timeProgress={timeProgress}
          showProgress={showProgress}
          handleDownloadFile={handleDownloadFile}
          isMobile={isMobile}
        />

        {/* Review Buttons - Mobile Only */}
        <ReviewButtons
          showReviewedButton={!user?.alreadyReviewed && order.status === EOrderStatus.DONE}
          openPopupReview={() => reviewPopup.setValue(true)}
          isMobile={isMobile}
        />

        {/* Mobile Tabs */}
        <Card sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 48,
                fontSize: '0.875rem',
              },
            }}
          >
            <Tab
              icon={<Iconify icon="solar:document-text-outline" width={20} />}
              label="Détails"
              iconPosition="start"
              sx={{ marginRight: '0!important' }}
            />
            <Tab
              icon={<Iconify icon="solar:history-outline" width={20} />}
              label="Suivi"
              iconPosition="start"
              sx={{ marginRight: '0!important' }}
            />
            <Tab
              icon={<Iconify icon="solar:chat-round-outline" width={20} />}
              label={`Messages${messages.length > 0 ? ` (${messages.length})` : ''}`}
              iconPosition="start"
              sx={{ marginRight: '0!important' }}
            />
          </Tabs>
        </Card>

        {/* Tab Content */}
        {currentTab === 0 && (
          <Stack spacing={2}>
            <OrderDetailsItems
              order={order}
              handleDownloadFile={handleDownloadFile}
              isMobile={isMobile}
            />
          </Stack>
        )}

        {currentTab === 1 && (
          <Stack spacing={2}>
            <OrderDetailsHistory
              timeline={order.timeline}
              endDate={order.endDate}
              purchaseTime={order.purchaseTimestamp}
            />
          </Stack>
        )}

        {currentTab === 2 && (
          <Box sx={{ height: '65vh' }}>
            <ChatView messages={messages} isMobile={isMobile} />
          </Box>
        )}

        <OrderDetailsAction
          order={order}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
          handleResetOrder={() => setConfirmDialogOpen(true)}
          handleOpenUploadFile={() => setOpen(true)}
        />

        {/* Common Dialogs */}
        <FileManagerUploadFile open={open} onClose={handleClose} handleSendFile={handleSendFile} />

        <ConfirmDialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          title="Réinitialiser la commande"
          content="Êtes-vous sûr de vouloir réinitialiser la commande ?"
          action={
            <Button onClick={handleResetOrder} color="error">
              Réinitialiser
            </Button>
          }
        />

        <ReviewDialog
          open={reviewPopup.value}
          onClose={reviewPopup.onFalse}
          giftMessage={giftMessage}
          reviewText={reviewText}
          onChangeReviewText={onChangeReviewText}
          onSendReview={handleSendReview}
        />
      </Container>
    );
  }

  // Desktop Layout
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <OrderHeader
        order={order}
        timeProgress={timeProgress}
        showProgress={showProgress}
        handleDownloadFile={handleDownloadFile}
        isMobile={false}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <OrderDetailsItems
              order={order}
              handleDownloadFile={handleDownloadFile}
              isMobile={false}
            />
            <OrderDetailsHistory
              timeline={order.timeline}
              endDate={order.endDate}
              purchaseTime={order.purchaseTimestamp}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Box sx={{ height: '65vh' }}>
              <ChatView messages={messages} isMobile={false} />
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <OrderDetailsAction
        order={order}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
        handleResetOrder={() => setConfirmDialogOpen(true)}
        handleOpenUploadFile={() => setOpen(true)}
      />

      {/* Common Dialogs */}
      <FileManagerUploadFile open={open} onClose={handleClose} handleSendFile={handleSendFile} />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Réinitialiser la commande"
        content="Êtes-vous sûr de vouloir réinitialiser la commande ?"
        action={
          <Button onClick={handleResetOrder} color="error">
            Réinitialiser
          </Button>
        }
      />

      <ReviewDialog
        open={reviewPopup.value}
        onClose={reviewPopup.onFalse}
        giftMessage={giftMessage}
        reviewText={reviewText}
        onChangeReviewText={onChangeReviewText}
        onSendReview={handleSendReview}
      />
    </Container>
  );
}
