import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Soumettez votre document',
    icon: '/assets/icons/faqs/ic_account.svg',
    href: '#',
  },
  {
    label: 'Commandez le service',
    icon: '/assets/icons/faqs/ic_payment.svg',
    href: '#',
  },

  {
    label: 'Parlons ensemble de votre projet',
    icon: '/assets/icons/faqs/ic_assurances.svg',
    href: '#',
  },
  {
    label: 'Recevez votre manuscrit corrigé et amélioré',
    icon: '/assets/icons/faqs/ic_delivery.svg',
    href: '#',
  },
];

// ----------------------------------------------------------------------

export default function CorrectionManuscritHowItWorks() {
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Comment ça marche ? </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Le processus est simplifié au maximum pour vous permettre de vous concentrer sur
          l’essentiel.
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Box
          component={MotionViewport}
          gap={3}
          display="grid"
          sx={{ mt: 2 }}
          gridTemplateColumns={{
            sx: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {CATEGORIES.map((category) => (
            <m.div key={category.label} variants={varFade().in}>
              <CardDesktop category={category} />
            </m.div>
          ))}
        </Box>
      </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 10 },
      }}
    >
      {renderDescription}
    </Container>
  );
}

type CardDesktopProps = {
  category: {
    label: string;
    icon: string;
  };
};

function CardDesktop({ category }: CardDesktopProps) {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'unset',
        textAlign: 'center',
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        },
      }}
    >
      <Image
        disabledEffect
        alt={icon}
        src={icon}
        sx={{ mb: 2, width: 80, height: 80, mx: 'auto' }}
      />

      <TextMaxLine variant="subtitle2" persistent>
        {label}
      </TextMaxLine>
    </Paper>
  );
}
