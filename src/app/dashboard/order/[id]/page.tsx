import { FirestoreOrderProvider } from 'src/firestore/providers/order/order-provider';
import { FirestoreMessagesProvider } from 'src/firestore/providers/messages/messages-provider';

import { OrderDetailsView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Order Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function OrderDetailsPage({ params }: Props) {
  const { id } = params;

  return (
    <FirestoreOrderProvider intent={id}>
      <FirestoreMessagesProvider>
        <OrderDetailsView />
      </FirestoreMessagesProvider>
    </FirestoreOrderProvider>
  );
}
