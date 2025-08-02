import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Timestamp } from 'firebase/firestore';

import { useBoolean } from 'src/hooks/use-boolean';

import { getDateTime } from 'src/utils/utils';

import { useAuthContext } from 'src/auth/hooks';
import { useFirebaseStorage } from 'src/storage/hooks/useFirebaseStorage';
import { useFirestoreOrder } from 'src/firestore/hooks/useFirestoreOrder';

import { EOrderStatus } from 'src/types/order';

import { sendReview } from '../../../firestore/review/review';

// ----------------------------------------------------------------------

export function useOrderHandlers() {
  const { order, updateOrderStatus, removeTimelineItem, addFixedFilePath, addTimelineItem } =
    useFirestoreOrder();
  const { user, setAlreadyReviewed } = useAuthContext();
  const firebaseStorage = useFirebaseStorage();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const reviewPopup = useBoolean(false);
  const [reviewText, setReviewText] = useState('');

  // Calculate progress for timeline
  const getTimeProgress = () => {
    if (!order?.purchaseTimestamp || !order?.endDate) {
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
  };

  const giftMessage = () => {
    if (!order) return '';

    let reduce = 0;
    if (order.service.price > 99) {
      reduce = 3;
    } else {
      reduce = 5;
    }

    return `Récupérez ${reduce}% sur votre commande en laissant un avis sur Trustpilot !`;
  };

  const handleDownloadFile = async (path: string) => {
    await firebaseStorage.downloadFile(path);

    if (order?.status === EOrderStatus.DONE && !user?.alreadyReviewed) {
      setTimeout(() => {
        reviewPopup.setValue(true);
      }, 8000);
    }
  };

  const handleSendReview = async () => {
    if (!order) return;

    await sendReview(reviewText, order.displayName, order.email, order.intent);
    setAlreadyReviewed(user?.uid, true);
    reviewPopup.onFalse();
    enqueueSnackbar('Merci pour votre avis !', {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      autoHideDuration: 3000,
    });
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

  const onChangeReviewText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  return {
    // State
    open,
    setOpen,
    confirmDialogOpen,
    setConfirmDialogOpen,
    reviewPopup,
    reviewText,

    // Computed values
    timeProgress: getTimeProgress(),
    showProgress: order?.status === EOrderStatus.IN_PROGRESS || order?.status === EOrderStatus.PAID,
    giftMessage: giftMessage(),

    // Handlers
    handleDownloadFile,
    handleSendReview,
    handleUpdateOrderStatus,
    handleResetOrder,
    handleSendFile,
    handleClose,
    onChangeReviewText,
  };
}
