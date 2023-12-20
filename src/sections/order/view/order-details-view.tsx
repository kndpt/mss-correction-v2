'use client';

import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { getDateTime } from 'src/utils/utils';

import { useAuthContext } from 'src/auth/hooks';
import { useFirebaseStorage } from 'src/storage/hooks/useFirebaseStorage';
import { useFirestoreOrder } from 'src/firestore/hooks/useFirestoreOrder';
import { useFirestoreMessage } from 'src/firestore/hooks/useFirestoreMessage';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import LoadingComponent from 'src/components/loading/LoadingComponent';

import { ChatView } from 'src/sections/chat/view';
import FileManagerUploadFile from 'src/sections/file-manager/file-manager-upload-file';

import { EOrderStatus } from 'src/types/order';

import OrderDetailsItems from '../order-details-item';
import OrderDetailsAction from '../order-details-action';
import OrderDetailsToolbar from '../order-details-toolbar';
import OrderDetailsHistory from '../order-details-history';

// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const {
    order,
    loading,
    error,
    updateOrderStatus,
    removeTimelineItem,
    addFixedFilePath,
    addTimelineItem,
  } = useFirestoreOrder();
  const { messages } = useFirestoreMessage();
  const { user } = useAuthContext();
  const settings = useSettingsContext();
  const firebaseStorage = useFirebaseStorage();
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;
  if (!order) return;
  if (!loading && !order) return <EmptyContent title="Commande introuvable" />;

  const handleDownloadFile = async (path: string) => {
    await firebaseStorage.downloadFile(path);
  };

  const handleUpdateOrderStatus = async () => {
    if (!user || !order || !order.id) return;
    await updateOrderStatus(order.id, EOrderStatus.IN_PROGRESS);
  };

  const handleResetOrder = async () => {
    if (!user || !order) return;
    await updateOrderStatus(order.sessionId, EOrderStatus.IN_PROGRESS);
    await addFixedFilePath(order.sessionId, '');
    await removeTimelineItem(order.sessionId);
    setConfirmDialogOpen(false);
  };

  const handleSendFile = async (file: File, forceWithoutFile: boolean = false) => {
    if (!order) return;

    if (!forceWithoutFile) {
      const filePath = `${order.email}/fixed/${file.name}`;
      await firebaseStorage.uploadFile(filePath, file);
      await addFixedFilePath(order.sessionId, filePath);
    }

    await updateOrderStatus(order.sessionId, EOrderStatus.DONE);

    await addTimelineItem(order.sessionId, {
      title: 'Commande terminée',
      description: getDateTime(),
      createdAt: Timestamp.now(),
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={order.intent}
        createdAt={order.purchaseTimestamp.toDate()}
        status={order.status}
        fixedPath={order.fixedFilePath}
        handleDownloadFile={handleDownloadFile}
        displayName={order.displayName}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrderDetailsItems order={order} handleDownloadFile={handleDownloadFile} />
        </Grid>

        <Grid item xs={12} md={7}>
          <OrderDetailsHistory
            timeline={order.timeline}
            endDate={order.endDate}
            purchaseTime={order.purchaseTimestamp}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <ChatView messages={messages} />
        </Grid>
      </Grid>
      <OrderDetailsAction
        order={order}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
        handleResetOrder={() => setConfirmDialogOpen(true)}
        handleOpenUploadFile={() => setOpen(true)}
      />
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
    </Container>
  );
}
