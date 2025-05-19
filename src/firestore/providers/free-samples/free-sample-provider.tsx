'use client';

import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useMemo, useState, useEffect, useCallback, createContext } from 'react';

import { DB } from 'src/utils/firebase';

import { IFreeSample } from 'src/types/free-sample';

// ----------------------------------------------------------------------

interface FreeSampleContextType {
  sample: IFreeSample | null;
  loading: boolean;
  error: Error | null;
  updateSample: (data: Partial<IFreeSample>) => Promise<{ success: boolean; error?: Error }>;
}

export const FirestoreFreeSampleContext = createContext<FreeSampleContextType>(
  {} as FreeSampleContextType
);

type Props = {
  children: React.ReactNode;
  id: string;
};

export const FirestoreFreeSampleProvider = ({ children, id }: Props) => {
  const router = useRouter();
  const [sample, setSample] = useState<IFreeSample | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const sampleRef = doc(DB, 'free-samples', id);

    getDoc(sampleRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setSample({ id: docSnap.id, ...docSnap.data() } as IFreeSample);
        } else {
          setSample(null);
          // If document doesn't exist, redirect to 404
          router.push('/404');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err as Error);
        setLoading(false);
      });
  }, [id, router]);

  const updateSample = useCallback(
    async (data: Partial<IFreeSample>) => {
      if (!sample?.id) return { success: false, error: new Error('Sample not found') };

      try {
        const sampleRef = doc(DB, 'free-samples', sample.id);
        await updateDoc(sampleRef, data);
        setSample((prev) => (prev ? { ...prev, ...data } : null));
        return { success: true };
      } catch (err) {
        console.error('Error updating sample:', err);
        return { success: false, error: err as Error };
      }
    },
    [sample?.id]
  );

  const memoizedValue = useMemo(
    () => ({
      sample,
      loading,
      error,
      updateSample,
    }),
    [sample, loading, error, updateSample]
  );

  return (
    <FirestoreFreeSampleContext.Provider value={memoizedValue}>
      {children}
    </FirestoreFreeSampleContext.Provider>
  );
};
