import { IMessageOrder } from 'src/types/order';

export type MessageContextType = {
  messages: IMessageOrder[];
  loading: boolean;
  error: any;
  sendMessage: (userId: string, content: string) => Promise<void>;
};
