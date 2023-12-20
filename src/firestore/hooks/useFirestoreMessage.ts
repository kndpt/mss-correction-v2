import { useContext } from 'react';

import { FirestoreMessageContext } from '../providers/messages/messages-provider';

export const useFirestoreMessage = () => {
  const context = useContext(FirestoreMessageContext);

  if (!context) {
    throw new Error("useFirebaseMessage doit être utilisé au sein d'un FirestoreOrderProvider");
  }

  return context;
};
