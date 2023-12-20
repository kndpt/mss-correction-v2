import { useState, useEffect } from 'react';
import { Query, onSnapshot } from 'firebase/firestore';

export const useFirestoreCollectionRealtime = <T>(q: Query | undefined) => {
  const [state, setState] = useState<{ data: T[]; loading: boolean; error: any }>({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    if (q) {
      setState((prevState) => ({ ...prevState, loading: true }));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data: T[] = snapshot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              }) as unknown as T
          );

          isMounted && setState({ data, loading: false, error: null });
        },
        (error) => {
          console.error(error);
          isMounted && setState({ data: [], loading: false, error: 'Error 4251' });
        }
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
      // eslint-disable-next-line no-else-return
    } else {
      isMounted && setState({ data: [], loading: false, error: null });
    }
  }, [q]);

  return state;
};
