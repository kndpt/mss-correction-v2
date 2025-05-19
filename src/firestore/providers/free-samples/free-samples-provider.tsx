'use client';

import { track } from '@vutolabs/analytics';
import { useMemo, useState, useCallback, createContext } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import { FreeSamplesContextType } from './types';

interface FreeSampleSubmission {
  text: string;
  email: string;
  createdAt: any; // Firebase Timestamp
  status: 'pending' | 'completed';
  source: string;
  correctionType: string;
}

export const FirestoreFreeSamplesContext = createContext<FreeSamplesContextType>(
  {} as FreeSamplesContextType
);

type Props = {
  children: React.ReactNode;
};

export const FirestoreFreeSamplesProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const submitFreeSample = useCallback(
    async (
      text: string,
      email: string,
      correctionType: string = 'proofreading_and_correction',
      source: string = 'correction-roman'
    ) => {
      setLoading(true);
      setError(null);

      try {
        const freeSamplesCollection = collection(DB, 'free-samples');

        const freeSampleData: Omit<FreeSampleSubmission, 'createdAt'> = {
          text,
          email,
          status: 'pending',
          source,
          correctionType,
        };

        await addDoc(freeSamplesCollection, {
          ...freeSampleData,
          createdAt: serverTimestamp(),
        });

        track('submit_free_sample', {
          source,
          correctionType,
        });

        setLoading(false);
        return { success: true };
      } catch (err) {
        const error2 = err as Error;
        console.error('Error submitting free sample:', error2);
        setError(error2);
        setLoading(false);
        return { success: false, error: error2 };
      }
    },
    []
  );

  const memoizedValue = useMemo(
    () => ({
      submitFreeSample,
      loading,
      error,
    }),
    [submitFreeSample, loading, error]
  );

  return (
    <FirestoreFreeSamplesContext.Provider value={memoizedValue}>
      {children}
    </FirestoreFreeSamplesContext.Provider>
  );
};
