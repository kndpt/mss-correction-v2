'use client';

import { useState, useEffect } from 'react';
import { query, orderBy, collection, onSnapshot } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import { IFreeSample } from 'src/types/free-sample';

export function useFreeSamplesList() {
  const [freeSamples, setFreeSamples] = useState<IFreeSample[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const freeSamplesCollection = collection(DB, 'free-samples');
    const q = query(freeSamplesCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const samples: IFreeSample[] = [];
        querySnapshot.forEach((doc) => {
          samples.push({ id: doc.id, ...doc.data() } as IFreeSample);
        });
        setFreeSamples(samples);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching free samples:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { freeSamples, loading, error };
}
