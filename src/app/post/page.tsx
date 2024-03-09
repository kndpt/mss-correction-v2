import { query, getDocs, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { fDate } from 'src/utils/format-time';

import { PostListHomeView } from 'src/sections/blog/view';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog - Mss Correction',
  description: `Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de motivation, ou encore un roman.`,
};

const getPosts = async () => {
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

export default async function PostListHomePage() {
  const posts = await getPosts();
  return <PostListHomeView posts={posts} />;
}
