'use client';

import { useMemo, useState, useEffect, useCallback, createContext } from 'react';
import {
  doc,
  query,
  where,
  addDoc,
  orderBy,
  updateDoc,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

import { useFirestoreCollection } from 'src/firestore/providers/hooks/useFirestoreCollection';

import { IPostItem } from 'src/types/blog';

import { PostsContextType } from './types';

export const FirestorePostsContext = createContext<PostsContextType>({} as PostsContextType);

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
};

export const FirestorePostsProvider = ({ children, isAdmin = false }: Props) => {
  const [_refresh, _setRefresh] = useState(false);

  const q = useMemo(() => {
    if (isAdmin) return query(collection(DB, 'posts'), orderBy('createdAt', 'desc'));
    return query(
      collection(DB, 'posts'),
      orderBy('createdAt', 'desc'),
      where('publish', '==', 'published')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_refresh]);

  const { data: firebasePosts, loading, error } = useFirestoreCollection<IPostItem>(q ?? undefined);

  const [posts, setPosts] = useState<IPostItem[]>([]);

  useEffect(() => {
    setPosts(firebasePosts);
  }, [firebasePosts]);

  const refresh = () => _setRefresh((prev) => !prev);

  const createPost = useCallback(async (newPost: IPostItem) => {
    await addDoc(collection(DB, 'posts'), newPost);

    refresh();
  }, []);

  const updatePost = useCallback(async (newPost: IPostItem) => {
    if (!newPost.id) throw new Error('Post ID is required');
    await updateDoc(doc(DB, 'posts', newPost.id), newPost);

    refresh();
  }, []);

  const deletePost = useCallback(async (id: string) => {
    if (!id) throw new Error('Post ID is required');
    await deleteDoc(doc(DB, 'posts', id));

    refresh();
  }, []);

  const getPost = useCallback(
    (slug: string) => firebasePosts.find((post) => post.slug === slug),
    [firebasePosts]
  );

  const memoizedValue = useMemo(
    () => ({ posts, getPost, createPost, updatePost, deletePost, loading, error }),
    [posts, getPost, createPost, updatePost, deletePost, loading, error]
  );

  return (
    <FirestorePostsContext.Provider value={memoizedValue}>
      {children}
    </FirestorePostsContext.Provider>
  );
};
