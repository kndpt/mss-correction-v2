import { useContext } from 'react';

import { FirestoreOrderContext } from '../providers/order/order-provider';

export const useFirestoreOrder = () => {
  const context = useContext(FirestoreOrderContext);

  if (!context) {
    throw new Error("useFirestoreOrder doit être utilisé au sein d'un AuthContext");
  }

  return context;
};
