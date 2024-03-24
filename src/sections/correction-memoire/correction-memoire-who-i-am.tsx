import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

interface Props {
  description: string;
}

export const CorrectionMemoireWhoIAm = ({ description }: Props) => {
  const theme = useTheme();
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Correctrice professionnelle
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Qui suis-je ?</Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography color="text.secondary">{description}</Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 6 }}>
      <m.div variants={varFade().inDown}>
        <Image
          disabledEffect
          alt="grid"
          src="/assets/images/oceane_profile.webp"
          width={250}
          sx={{
            borderRadius: '50%',
            border: '6px solid',
            borderColor: theme.palette.primary.main,
          }}
        />
      </m.div>
    </Box>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      {renderContent}
      {renderDescription}
    </Container>
  );
};
