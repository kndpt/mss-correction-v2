import { IOrder } from 'src/types/order';

export type OrdersContextType = {
  orders: IOrder[] | null;
  loading: boolean;
  error: any;
};
