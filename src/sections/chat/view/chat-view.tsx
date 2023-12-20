'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from 'src/components/settings';

import { IMessageOrder } from 'src/types/order';

import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';

// ----------------------------------------------------------------------

type Props = {
  messages: IMessageOrder[];
};

export default function Chat({ messages }: Props) {
  const { user } = useAuthContext();

  const settings = useSettingsContext();

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 48 }}
    >
      Messages
    </Stack>
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={messages} userId={user?.id ?? 'USER_ID_NOT_FOUND'} />

      <ChatMessageInput />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ padding: '0px!important' }}>
      <Stack component={Card} direction="row" sx={{ height: '56vh' }}>
        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
