import Box from '@mui/material/Box';

import useIsAdmin from 'src/auth/hooks/use-is-admin';

import Scrollbar from 'src/components/scrollbar';

import { IMessageOrder } from 'src/types/order';

import ChatMessageItem from './chat-message-item';
import useMessagesScroll from './hooks/use-messages-scroll';

// ----------------------------------------------------------------------

type Props = {
  messages: IMessageOrder[];
  userId: string;
};

export default function ChatMessageList({ messages = [], userId }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);
  const isAdmin = useIsAdmin();

  return (
    <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, height: 1 }}>
      <Box>
        {messages.map((message, i) => (
          <ChatMessageItem key={i} message={message} userId={userId} isAdmin={isAdmin} />
        ))}
      </Box>
    </Scrollbar>
  );
}
