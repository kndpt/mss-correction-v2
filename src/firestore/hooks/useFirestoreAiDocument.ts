import { useContext } from 'react';

import { FirestoreAiDocumentContext } from '../providers/ai-document/ai-provider';

export const useFirestoreAiDocument = () => {
  const context = useContext(FirestoreAiDocumentContext);

  if (!context) {
    throw new Error("useFirestoreAiDocument doit être utilisé au sein d'un AuthContext");
  }

  return context;
};
