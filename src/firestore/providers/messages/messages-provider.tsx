'use client';

import React, { useMemo, useCallback, createContext } from 'react';
import { Query, query, addDoc, orderBy, Timestamp, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import { useFirestoreOrder } from 'src/firestore/hooks/useFirestoreOrder';
import { useFirestoreCollectionRealtime } from 'src/firestore/providers/hooks/useFirestoreCollectionRealtime';

import { IMessageOrder } from 'src/types/order';

import { MessageContextType } from './types';

export const FirestoreMessageContext = createContext<MessageContextType>({} as MessageContextType);

type Props = {
  children: React.ReactNode;
};

export const FirestoreMessagesProvider = ({ children }: Props) => {
  const context = useFirestoreOrder();
  const orderId = context.order?.id ?? 'ORDER_ID_NOT_FOUND';

  const messagesQuery: Query = useMemo(() => {
    const colRef = collection(DB, 'orders', orderId, 'messages');
    return query(colRef, orderBy('timestamp', 'asc'));
  }, [orderId]);

  const {
    data: messages,
    loading,
    error,
  } = useFirestoreCollectionRealtime<IMessageOrder>(messagesQuery);

  const sendMessage = useCallback(
    async (userId: string, content: string) => {
      const message: IMessageOrder = {
        timestamp: Timestamp.now(),
        content,
        sender: userId,
      };
      await addDoc(collection(DB, 'orders', orderId, 'messages'), message);
    },
    [orderId]
  );

  const memoizedValue = useMemo(
    () => ({ messages, loading, error, sendMessage }),
    [messages, loading, error, sendMessage]
  ); // as MessageContextType;

  return (
    <FirestoreMessageContext.Provider value={memoizedValue}>
      {children}
    </FirestoreMessageContext.Provider>
  );
};
