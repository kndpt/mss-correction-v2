import { useState, useEffect } from 'react';
import { Query, getDocs } from 'firebase/firestore';

export const useFirestoreDocument = <T>(q: Query | undefined) => {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: any }>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const querySnapshot = await getDocs(q!);
        const data = !querySnapshot.empty
          ? ({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id } as unknown as T)
          : null;
        isMounted && setState({ data, loading: false, error: null });
      } catch (error) {
        console.error(error);
        isMounted && setState({ data: null, loading: false, error: 'Error 4250' });
      }
    };

    q ? fetchData() : isMounted && setState({ data: null, loading: false, error: null });

    return () => {
      isMounted = false;
    };
  }, [q]);

  return state;
};
