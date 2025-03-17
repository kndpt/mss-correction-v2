'use client';

import { doc, getDoc } from 'firebase/firestore';
import { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { DB } from 'src/utils/firebase';

import { AuthContext } from 'src/auth/context/auth-context';

import { IAiDocument } from 'src/types/ai-document';

import { AiDocumentContextType } from './types';

export const FirestoreAiDocumentContext = createContext<AiDocumentContextType>(
  {} as AiDocumentContextType
);

type Props = {
  children: React.ReactNode;
  id: string;
};

export const FirestoreAiDocumentProvider = ({ children, id }: Props) => {
  const { user } = useContext(AuthContext);
  const [document, setDocument] = useState<IAiDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user || !id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const docRef = doc(DB, 'ai-documents', id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setDocument(docSnap.data() as IAiDocument);
        } else {
          setDocument(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id, user]);

  const memoizedValue = useMemo(
    () => ({
      document,
      loading,
      error,
    }),
    [document, loading, error]
  );

  return (
    <FirestoreAiDocumentContext.Provider value={memoizedValue}>
      {children}
    </FirestoreAiDocumentContext.Provider>
  );
};
