import { query, getDocs, orderBy, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { paramCase } from 'src/utils/change-case';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Edit',
};

type Props = {
  params: {
    title: string;
  };
};

export default function PostEditPage({ params }: Props) {
  const { title } = params;

  return <PostEditView title={title} />;
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
