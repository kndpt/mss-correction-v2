// eslint-disable-next-line import/no-duplicates
import { fr } from 'date-fns/locale';
// eslint-disable-next-line import/no-duplicates
import { formatDistanceToNowStrict } from 'date-fns';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IMessageOrder } from 'src/types/order';

import useGetMessage from './hooks/use-get-message';

// ----------------------------------------------------------------------

type Props = {
  message: IMessageOrder;
  userId: string;
  isAdmin: boolean;
};

export default function ChatMessageItem({ message, userId, isAdmin = false }: Props) {
  const { me } = useGetMessage({
    message,
    currentUserId: userId,
  });

  const { content: body, timestamp: createdAt } = message;

  const getName = () => {
    if (me) {
      return 'Moi';
    }
    if (!me && isAdmin) {
      return 'Client';
    }
    return 'Océane';
  };

  const getDate = () => {
    const options = {
      addSuffix: true,
      locale: fr,
    };

    if (!createdAt) return '';

    try {
      return formatDistanceToNowStrict(new Date(createdAt.toDate()), options);
    } catch (ex) {
      return '';
    }
  };

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {getName()}&nbsp;
      {getDate()}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(me && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {body}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 2 }}>
      <Stack alignItems={me ? 'flex-end' : 'unset'}>
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            whiteSpace: 'pre-wrap',
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
        </Stack>
      </Stack>
    </Stack>
  );
}
