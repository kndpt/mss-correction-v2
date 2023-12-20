import { IOptionType, IServiceOrder, IOptionDuration } from 'src/types/order';

export type ServiceAction =
  | {
      type: 'setUploadedFile';
      payload: {
        file: File | null;
        name: string;
      };
    }
  | { type: 'setWordsValue'; payload: number }
  | { type: 'setPrice'; payload: number }
  | { type: 'setOptionDuration'; payload: IOptionDuration }
  | { type: 'setOptionType'; payload: IOptionType }
  | { type: 'setUploadedFileName'; payload: string }
  | { type: 'setInformations'; payload: string }
  | { type: 'setTitle'; payload: string };

export interface IService {
  state: IServiceOrder;
  getTotalDays: () => number;
  getBeautificationDays: () => number;
  getDeliveryDate: () => string;
}
