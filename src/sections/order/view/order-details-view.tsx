'use client';

import React, { useState } from 'react';
import { useSnackbar } from "notistack";
import { Timestamp } from 'firebase/firestore';

import Grid from '@mui/material/Grid';
import Link from "@mui/material/Link";
import { Button } from '@mui/material';
import { Box, Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

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

import { EOrderStatus } from 'src/types/order';

import Image from "../../../components/image";
import ChatView from '../components/chat/chat-view';
import OrderDetailsItems from '../order-details-item';
import { useBoolean } from "../../../hooks/use-boolean";
import OrderDetailsAction from '../order-details-action';
import OrderDetailsToolbar from '../order-details-toolbar';
import OrderDetailsHistory from '../order-details-history';
import { sendReview } from "../../../firestore/review/review";
import FileManagerUploadFile from '../components/file-manager-upload-file';

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
  const { user, setAlreadyReviewed } = useAuthContext();
  const settings = useSettingsContext();
  const firebaseStorage = useFirebaseStorage();
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const reviewPopup = useBoolean(false);
  const [reviewText, setReviewText] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  if (loading) return <LoadingComponent/>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return;
  if (!loading && !order) return <EmptyContent title="Commande introuvable"/>;

  const giftMessage = () => {
    let reduce = 0;
    if (order.service.price > 99) {
      reduce = 3;
    } else {
      reduce = 5;
    }

    return `Récupérez ${reduce}% sur votre commande en laissant un avis sur Trustpilot !`;
  }

  const handleDownloadFile = async (path: string) => {
    await firebaseStorage.downloadFile(path);

    if (order.status === EOrderStatus.DONE && !user?.alreadyReviewed) {
      setTimeout(() => {
        reviewPopup.setValue(true);
      }, 15000);
    }
  };

  const handleSendReview = async () => {
    await sendReview(reviewText, order.displayName, order.email, order.intent);
    setAlreadyReviewed(user?.uid, true);
    reviewPopup.onFalse();
    enqueueSnackbar("Merci pour votre avis !", {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      autoHideDuration: 3000,
    });
  }

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

  const onChangeReviewText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  }

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
          <OrderDetailsItems order={order} handleDownloadFile={handleDownloadFile}/>
        </Grid>

        <Grid item xs={12} md={7}>
          <OrderDetailsHistory
            timeline={order.timeline}
            endDate={order.endDate}
            purchaseTime={order.purchaseTimestamp}
            showReviewedButton={!user?.alreadyReviewed && order.status === EOrderStatus.DONE}
            openPopupReview={() => reviewPopup.setValue(true)}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <ChatView messages={messages}/>
        </Grid>
      </Grid>
      <OrderDetailsAction
        order={order}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
        handleResetOrder={() => setConfirmDialogOpen(true)}
        handleOpenUploadFile={() => setOpen(true)}
      />
      <FileManagerUploadFile open={open} onClose={handleClose} handleSendFile={handleSendFile}/>
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
      <Dialog open={reviewPopup.value} fullWidth maxWidth="xs" onClose={reviewPopup.onFalse}>
        <DialogTitle>Merci pour votre commande !</DialogTitle>

        <Box sx={{ width: '100%', textAlign: 'center' }}>

          <Tooltip title={giftMessage()} arrow>
            <Image alt="cadeau" src="/assets/images/cadeau.png" sx={{ width: 100 }}/>
          </Tooltip>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center', mb: 6 }}>
          <Typography variant="caption">Touchez pour voir le cadeau</Typography>
        </Box>

        <Stack spacing={3} sx={{ px: 3, textAlign: 'center' }}>
          <Typography variant="body1">Laissez un avis sur <Link
            href="https://fr.trustpilot.com/review/msscorrection.fr" target="_blank">Trustpilot</Link> et recevez une
            surprise après
            validation ! 🎁</Typography>
          <Typography variant="body1">Ou donnez votre avis ici (sans cadeau) :</Typography>
          <TextField fullWidth multiline rows={3} placeholder="Votre avis..." onChange={onChangeReviewText} />
          <Typography variant="body1">Merci pour votre confiance !</Typography>
        </Stack>

        <DialogActions>
          <Button onClick={reviewPopup.onFalse}>Passer</Button>

          <Button variant="contained" onClick={() => {
            window.open('https://fr.trustpilot.com/review/msscorrection.fr', '_blank');
          }}
                  sx={{
                    background: '#007f4e',
                    ':hover': {
                      background: '#00673f',
                    },
                  }}>
            Laisser un avis Trustpilot
          </Button>

          <Button variant="contained" onClick={handleSendReview}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
