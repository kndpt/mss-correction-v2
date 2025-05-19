import { useContext } from 'react';

import { FirestoreFreeSamplesContext } from '../providers/free-samples/free-samples-provider';

export const useFirestoreFreeSamples = () => {
  const context = useContext(FirestoreFreeSamplesContext);

  if (!context) {
    throw new Error(
      "useFirestoreFreeSamples doit être utilisé au sein d'un FirestoreFreeSamplesProvider"
    );
  }

  return context;
};
