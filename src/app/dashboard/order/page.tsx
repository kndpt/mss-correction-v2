import { FirestoreOrdersProvider } from 'src/firestore/providers/orders/orders-provider';

import { OrderListView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Mes commandes',
};

export default function OrderListPage() {
  return (
    <FirestoreOrdersProvider>
      <OrderListView />
    </FirestoreOrdersProvider>
  );
}
