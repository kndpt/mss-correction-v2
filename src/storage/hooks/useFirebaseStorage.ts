import { useContext } from 'react';

import { FirebaseStorageContext } from '../providers/storage-provider';

export const useFirebaseStorage = () => {
  const context = useContext(FirebaseStorageContext);

  if (!context) {
    throw new Error("useFirebaseStorage doit être utilisé au sein d'un FirebaseStorageProvider");
  }

  return context;
};
