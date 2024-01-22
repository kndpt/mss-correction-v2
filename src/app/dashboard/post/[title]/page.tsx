import { query, getDocs, orderBy, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { paramCase } from 'src/utils/change-case';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Details',
};

type Props = {
  params: {
    title: string;
  };
};

export default function PostDetailsPage({ params }: Props) {
  const { title } = params;

  return <PostDetailsView title={title} />;
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
