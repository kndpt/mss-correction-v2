import { IOrder, EOrderStatus, ITimelineItem } from 'src/types/order';

export type OrderContextType = {
  order: IOrder | null;
  loading: boolean;
  error: any;
  updateOrderStatus: (orderId: string, status: EOrderStatus) => Promise<void>;
  removeTimelineItem: (orderId: string) => Promise<void>;
  addFixedFilePath: (orderId: string, fixedFilePath: string) => Promise<void>;
  addTimelineItem: (orderId: string, item: ITimelineItem) => Promise<void>;
};
