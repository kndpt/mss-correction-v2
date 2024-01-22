import { useContext } from 'react';

import { FirestorePostsContext } from '../providers/posts/posts-provider';

export const useFirestorePosts = () => {
  const context = useContext(FirestorePostsContext);

  if (!context) {
    throw new Error("useFirestorePosts doit être utilisé au sein d'un FirestoreOrdersContext");
  }

  return context;
};
