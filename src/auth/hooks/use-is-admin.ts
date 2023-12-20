import { useAuthContext } from './use-auth-context';

const useIsAdmin = () => {
  const { user } = useAuthContext();

  const isAdmin = user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID ?? false;

  return isAdmin;
};

export default useIsAdmin;
