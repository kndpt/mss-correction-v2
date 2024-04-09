import { sub } from 'date-fns';
import { useRef, useMemo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import uuidv4 from 'src/utils/uuidv4';

import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { useFirestoreMessage } from 'src/firestore/hooks/useFirestoreMessage';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ChatMessageInput() {
  const { sendMessage: send } = useFirestoreMessage();

  const { user } = useAuthContext();

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: new Date(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online' as 'online' | 'offline' | 'alway' | 'busy',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const sendMessageOrCreateConversation = useCallback(async () => {
    try {
      if (message) {
        await send(user?.id, messageData.body);
      }
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }, [message, messageData, send, user?.id]);

  const handleEnterSendMessage = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        const isEmptyOrSpaces = /^[\s]*$/;
        if (isEmptyOrSpaces.test(message)) {
          return;
        }

        sendMessageOrCreateConversation();
      }
    },
    [message, sendMessageOrCreateConversation]
  );

  const handleSendMessage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      sendMessageOrCreateConversation();
    },
    [sendMessageOrCreateConversation]
  );

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleEnterSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        multiline
        maxRows={6}
        // startAdornment={
        //   <IconButton>
        //     <Iconify icon="eva:smiling-face-fill" />
        //   </IconButton>
        // }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleSendMessage}>
              <Iconify icon="solar:plain-bold-duotone" />
            </IconButton>
            {/* <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton> */}
          </Stack>
        }
        sx={{
          px: 1,
          pl: 2,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}
