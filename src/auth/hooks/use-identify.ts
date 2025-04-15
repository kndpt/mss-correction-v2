import { useEffect } from 'react';
import { identify } from '@vutolabs/analytics';

/**
 * TODO: not yet used, because firebase auth offers onAuthStateChanged which is good enough
 * @param email
 */
export function useIdentify(email: string | null) {
  useEffect(() => {
    if (!email) return;

    const key = `identified:${email}`;
    const alreadyIdentified = sessionStorage.getItem(key);

    if (!alreadyIdentified && email) {
      identify(email);
      sessionStorage.setItem(key, 'true');
    }
  }, [email]);
}
