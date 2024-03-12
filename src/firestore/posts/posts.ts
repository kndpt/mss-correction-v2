import { query, where, getDocs, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { fDate } from 'src/utils/format-time';

import { IPostItem } from 'src/types/blog';

/**
 * Get posts from firestore with createdAt formatted.
 * @returns
 */
export const getPosts = async () => {
  const q = query(collection(DB, 'posts'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as IPostItem;
    return {
      ...data,
      // Need to convert object with toJSON methods to simple value before passing it to props.
      createdAt: fDate(data.createdAt.toDate()),
    };
  }) as IPostItem[];
};

export const getPost = async (title: string) => {
  const q = query(collection(DB, 'posts'), where('slug', '==', title));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  const post = doc.data() as IPostItem;

  return {
    ...post,
    // Need to convert object with toJSON methods to simple value before passing it to props.
    createdAt: fDate(post.createdAt.toDate()),
  };
};
