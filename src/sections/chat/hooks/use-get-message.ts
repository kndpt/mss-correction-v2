import { IMessageOrder } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  message: IMessageOrder;
  currentUserId: string;
};

export default function useGetMessage({ message, currentUserId }: Props) {
  const senderDetails =
    message.sender === currentUserId
      ? {
          type: 'me',
        }
      : {
          type: 'admin',
        };

  const me = senderDetails.type === 'me';

  return {
    me,
    senderDetails,
  };
}
