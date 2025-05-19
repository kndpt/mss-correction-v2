import { useContext } from 'react';

import { FirestoreFreeSampleContext } from '../providers/free-samples/free-sample-provider';

export const useFirestoreFreeSample = () => {
  const context = useContext(FirestoreFreeSampleContext);

  if (!context) {
    throw new Error(
      "useFirestoreFreeSample doit être utilisé au sein d'un FirestoreFreeSampleProvider"
    );
  }

  return context;
};
