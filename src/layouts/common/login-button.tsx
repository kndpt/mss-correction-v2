import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button href={paths.auth.firebase.login} variant="outlined" sx={{ mr: 1, ...sx }}>
      Se connecter
    </Button>
  );
}
