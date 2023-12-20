import { useState, useEffect } from 'react';
import { Query, getDocs } from 'firebase/firestore';

export const useFirestoreCollection = <T>(q: Query | undefined) => {
  const [state, setState] = useState<{ data: T[]; loading: boolean; error: any }>({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const querySnapshot = await getDocs(q!);
        const data: T[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            }) as unknown as T
        );

        isMounted && setState({ data, loading: false, error: null });
      } catch (error) {
        console.error(error);
        isMounted && setState({ data: [], loading: false, error: 'Error 4252' });
      }
    };

    q ? fetchData() : isMounted && setState({ data: [], loading: false, error: null });

    return () => {
      isMounted = false;
    };
  }, [q]);

  return state;
};
