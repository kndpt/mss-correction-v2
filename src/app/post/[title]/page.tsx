import { query, getDocs, orderBy, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { paramCase } from 'src/utils/change-case';

import { getPost, getPosts } from 'src/firestore/posts/posts';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

type Props = {
  params: {
    title: string;
  };
};

export default async function PostDetailsHomePage({ params }: Props) {
  const { title } = params;
  const post = await getPost(title);
  const posts = await getPosts();

  return <PostDetailsHomeView title={title} post={post} posts={posts} />;
}

export async function generateStaticParams() {
  const q = query(collection(DB, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    params: {
      title: paramCase(doc.data().title),
    },
  }));
}
