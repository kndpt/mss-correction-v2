import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  icon: React.ReactElement;
  title: string;
  onClick?: VoidFunction;
}

export default function ServiceLettreMotivationType({ icon, title, sx, onClick, ...other }: Props) {
  return (
    <Card sx={{ p: 4 }} onClick={onClick}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 75,
            height: 75,
            lineHeight: 0,
            borderRadius: '50%',
            bgcolor: 'background.neutral',
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" sx={{ mt: 4 }}>{title}</Typography>
      </Box>
    </Card>
  );
}
