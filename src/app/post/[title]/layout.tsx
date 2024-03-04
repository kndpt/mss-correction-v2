import React from 'react';
import type { Metadata } from 'next';
import { query, where, getDocs, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

type Params = {
  params: {
    title: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const q = query(collection(DB, 'posts'), where('slug', '==', params.title));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  const data = doc.data();

  return {
    title: data.metaTitle ?? '',
    description: data.metaDescription ?? '',
  };
}

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <section>{children}</section>;
}
