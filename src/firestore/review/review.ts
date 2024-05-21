import { addDoc, Timestamp, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';

export const sendReview = async (content: string, name: string, email: string, orderIntent: string) => {
  const docRef = await addDoc(collection(DB, 'reviews'), {
    content,
    name,
    email,
    orderIntent,
    createdAt: Timestamp.now()
  });

  return docRef.id;
};
