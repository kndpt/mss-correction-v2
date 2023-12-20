'use client';

import { useMemo, useContext, createContext } from 'react';
import { query, where, orderBy, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { AuthContext } from 'src/auth/context/auth-context';
import { useFirestoreCollection } from 'src/firestore/providers/hooks/useFirestoreCollection';

import { IOrder } from 'src/types/order';

import { OrdersContextType } from './types';

export const FirestoreOrdersContext = createContext<OrdersContextType>({
  orders: [],
  loading: true,
  error: null,
});

type Props = {
  children: React.ReactNode;
};

export const FirestoreOrdersProvider = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const isAdmin = useIsAdmin();

  const q = useMemo(() => {
    let baseQuery = query(collection(DB, 'orders'));

    if (user) {
      if (!isAdmin) {
        baseQuery = query(baseQuery, where('userId', '==', user.id), orderBy('updatedAt', 'desc'));
      } else {
        baseQuery = query(baseQuery, orderBy('updatedAt', 'desc'));
      }
    }

    return baseQuery;
  }, [user, isAdmin]);

  const { data: orders, loading, error } = useFirestoreCollection<IOrder>(q ?? undefined);

  const memoizedValue = useMemo(() => ({ orders, loading, error }), [orders, loading, error]);

  return (
    <FirestoreOrdersContext.Provider value={memoizedValue}>
      {children}
    </FirestoreOrdersContext.Provider>
  );
};
