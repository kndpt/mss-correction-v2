'use client';

import { useMemo, createContext } from 'react';
import { query, where, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import { useFirestoreCollection } from 'src/firestore/providers/hooks/useFirestoreCollection';

import { IOrder } from 'src/types/order';

import { AnalyticsContextType } from './types';

export const FirestoreAnalyticsContext = createContext<AnalyticsContextType>({
  actualOrders: 0,
  averagePrice: 0,
  averageTime: 0,
  files: 0,
  words: 0,
  loading: true,
  error: null,
});

type Props = {
  children: React.ReactNode;
};

export const FirestoreAnalyticsProvider = ({ children }: Props) => {
  const q = useMemo(() => query(collection(DB, 'orders'), where('status', '==', 'done')), []);

  const { data: orders, loading, error } = useFirestoreCollection<IOrder>(q ?? undefined);

  // TODO: to change with filter status=in_progress (in query firestore)
  const actualOrders = useMemo(() => orders.length / 3 ?? 0, [orders]);

  const averagePrice = useMemo(
    () => orders.reduce((acc, curr) => acc + curr.service.price, 0) / actualOrders,
    [orders, actualOrders]
  );

  const averageTime = useMemo(() => {
    const totalMilliseconds = orders.reduce((acc, curr) => {
      const startDate = curr.purchaseTimestamp.toDate();
      const endDate = curr.timeline[curr.timeline.length - 1].createdAt.toDate();
      const milliseconds = endDate.getTime() - startDate.getTime();
      return acc + milliseconds;
    }, 0);
    return totalMilliseconds / actualOrders;
  }, [orders, actualOrders]);

  const files = useMemo(() => orders.length, [orders]);

  const words = useMemo(
    () => orders.reduce((acc, curr) => acc + curr.service.wordsValue, 0),
    [orders]
  );

  const memoizedValue = useMemo(
    () => ({
      orders,
      loading,
      error,
      actualOrders,
      averagePrice,
      averageTime,
      files,
      words,
    }),
    [orders, loading, error, actualOrders, averagePrice, averageTime, files, words]
  );

  return (
    <FirestoreAnalyticsContext.Provider value={memoizedValue}>
      {children}
    </FirestoreAnalyticsContext.Provider>
  );
};
