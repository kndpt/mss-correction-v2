'use client';

import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { 
  collection, 
  addDoc, 
  Timestamp,
  doc,
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

import { DB as db } from 'src/utils/firebase';
import { ELayoutServiceTier, ILayoutService, ILayoutServiceOrder, EOrderStatus } from 'src/types/order';

// ----------------------------------------------------------------------

export const useFirestoreLayoutServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const createLayoutServiceOrder = useCallback(async (
    originalOrderId: string,
    userId: string,
    service: ILayoutService
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const layoutServiceOrder: Omit<ILayoutServiceOrder, 'id'> = {
        orderId: originalOrderId,
        userId,
        service,
        status: EOrderStatus.PENDING,
        createdAt: Timestamp.now(),
        estimatedDelivery: Timestamp.fromDate(
          new Date(Date.now() + service.estimatedDays * 24 * 60 * 60 * 1000)
        )
      };

      const docRef = await addDoc(collection(db, 'layoutServiceOrders'), layoutServiceOrder);
      
      enqueueSnackbar('Service de mise en page commandé avec succès !', { 
        variant: 'success' 
      });
      
      return docRef.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la commande';
      setError(errorMessage);
      enqueueSnackbar(`Erreur : ${errorMessage}`, { variant: 'error' });
      return null;
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  const updateLayoutServiceStatus = useCallback(async (
    layoutServiceOrderId: string,
    status: EOrderStatus
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, 'layoutServiceOrders', layoutServiceOrderId);
      await updateDoc(docRef, { status });
      
      enqueueSnackbar('Statut mis à jour avec succès !', { 
        variant: 'success' 
      });
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(errorMessage);
      enqueueSnackbar(`Erreur : ${errorMessage}`, { variant: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  const getLayoutServiceOrdersByUser = useCallback(async (
    userId: string
  ): Promise<ILayoutServiceOrder[]> => {
    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'layoutServiceOrders'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const orders: ILayoutServiceOrder[] = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ 
          ...doc.data() as Omit<ILayoutServiceOrder, 'id'>,
          id: doc.id 
        });
      });
      
      return orders;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération';
      setError(errorMessage);
      enqueueSnackbar(`Erreur : ${errorMessage}`, { variant: 'error' });
      return [];
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  const getLayoutServiceOrdersByOrder = useCallback(async (
    orderId: string
  ): Promise<ILayoutServiceOrder[]> => {
    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'layoutServiceOrders'),
        where('orderId', '==', orderId)
      );
      
      const querySnapshot = await getDocs(q);
      const orders: ILayoutServiceOrder[] = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ 
          ...doc.data() as Omit<ILayoutServiceOrder, 'id'>,
          id: doc.id 
        });
      });
      
      return orders;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération';
      setError(errorMessage);
      enqueueSnackbar(`Erreur : ${errorMessage}`, { variant: 'error' });
      return [];
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  return {
    loading,
    error,
    createLayoutServiceOrder,
    updateLayoutServiceStatus,
    getLayoutServiceOrdersByUser,
    getLayoutServiceOrdersByOrder
  };
};