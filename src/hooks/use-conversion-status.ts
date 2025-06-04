'use client';

import { useState, useEffect } from 'react';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { query, where, getDocs, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

interface ConversionStatus {
  isUser: boolean;
  isClient: boolean;
  loading: boolean;
}

export function useConversionStatus(email: string): ConversionStatus {
  const [status, setStatus] = useState<ConversionStatus>({
    isUser: false,
    isClient: false,
    loading: true,
  });

  useEffect(() => {
    if (!email) {
      setStatus({ isUser: false, isClient: false, loading: false });
      return;
    }

    const checkConversions = async () => {
      try {
        // Check if user exists in Auth and has orders in parallel
        const [authMethods, ordersSnapshot] = await Promise.all([
          fetchSignInMethodsForEmail(getAuth(), email).catch(() => []),
          getDocs(query(collection(DB, 'orders'), where('email', '==', email))),
        ]);

        setStatus({
          isUser: authMethods.length > 0,
          isClient: !ordersSnapshot.empty,
          loading: false,
        });
      } catch (error) {
        console.error('Error checking conversion status:', error);
        setStatus({ isUser: false, isClient: false, loading: false });
      }
    };

    checkConversions();
  }, [email]);

  return status;
}
