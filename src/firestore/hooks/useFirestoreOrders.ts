import { useContext } from 'react';

import { FirestoreOrdersContext } from '../providers/orders/orders-provider';

export const useFirestoreOrders = () => {
  const context = useContext(FirestoreOrdersContext);

  if (!context) {
    throw new Error("useFirestoreOrders doit être utilisé au sein d'un AuthContext");
  }

  return context;
};
