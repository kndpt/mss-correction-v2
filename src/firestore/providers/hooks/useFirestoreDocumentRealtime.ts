import { useState, useEffect } from 'react';
import { Query, onSnapshot } from 'firebase/firestore';

export const useFirestoreDocumentRealtime = <T>(q: Query | undefined) => {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: any }>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    if (!q) {
      isMounted && setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true }));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const data = !querySnapshot.empty
          ? ({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id } as unknown as T)
          : null;
        isMounted && setState({ data, loading: false, error: null });
      } catch (error) {
        console.error(error);
        isMounted && setState({ data: null, loading: false, error: 'Error 4254' });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [q]);

  return state;
};
