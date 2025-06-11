'use client';

import { useMemo, useContext, createContext } from 'react';
import { doc, query, where, getDoc, updateDoc, collection, arrayUnion } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { AuthContext } from 'src/auth/context/auth-context';
import { useFirestoreDocumentRealtime } from 'src/firestore/providers/hooks/useFirestoreDocumentRealtime';

import { IOrder, EOrderStatus, ITimelineItem } from 'src/types/order';

import { OrderContextType } from './types';

export const FirestoreOrderContext = createContext<OrderContextType>({} as OrderContextType);

type Props = {
  children: React.ReactNode;
  intent: string;
};

export const FirestoreOrderProvider = ({ children, intent }: Props) => {
  const { user } = useContext(AuthContext);
  const isAdmin = useIsAdmin();

  const q = useMemo(() => {
    if (!user || !intent) return null;

    // Check if intent looks like a document ID (no dashes/long string) vs Stripe intent (cs_xxx format)
    const isDocumentId = !intent.startsWith('cs_') && intent.length === 20;

    if (isDocumentId) {
      // Query by document ID for pending orders
      if (isAdmin) {
        return query(collection(DB, 'orders'), where('__name__', '==', intent));
      }
      return query(
        collection(DB, 'orders'),
        where('__name__', '==', intent),
        where('userId', '==', user.id)
      );
    }
    // Query by intent for paid orders
    if (isAdmin) {
      return query(collection(DB, 'orders'), where('intent', '==', intent));
    }
    return query(
      collection(DB, 'orders'),
      where('intent', '==', intent),
      where('userId', '==', user.id)
    );
  }, [user, intent, isAdmin]);

  const { data: order, loading, error } = useFirestoreDocumentRealtime<IOrder>(q ?? undefined);

  const updateOrderStatus = async (orderId: string, status: EOrderStatus) => {
    const orderRef = doc(DB, 'orders', orderId);
    await updateDoc(orderRef, { status });
  };

  const addFixedFilePath = async (orderId: string, fixedFilePath: string) => {
    const orderRef = doc(DB, 'orders', orderId);
    await updateDoc(orderRef, { fixedFilePath });
  };

  const removeTimelineItem = async (orderId: string) => {
    const orderRef = doc(DB, 'orders', orderId);

    const docSnapshot = await getDoc(orderRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      if (data && Array.isArray(data.timeline)) {
        const { timeline } = data;
        timeline.pop();
        await updateDoc(orderRef, { timeline });
      }
    }
  };

  const addTimelineItem = async (orderId: string, item: ITimelineItem) => {
    const orderRef = doc(DB, 'orders', orderId);
    await updateDoc(orderRef, {
      timeline: arrayUnion(item),
    });
  };

  const memoizedValue = useMemo(
    () => ({
      order,
      loading,
      error,
      updateOrderStatus,
      removeTimelineItem,
      addFixedFilePath,
      addTimelineItem,
    }),
    [order, loading, error]
  );

  return (
    <FirestoreOrderContext.Provider value={memoizedValue}>
      {children}
    </FirestoreOrderContext.Provider>
  );
};
