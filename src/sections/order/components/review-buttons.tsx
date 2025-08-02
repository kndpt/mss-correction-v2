'use client';

import { m } from 'framer-motion';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  showReviewedButton: boolean;
  openPopupReview: () => void;
  isMobile?: boolean;
};

export default function ReviewButtons({
  showReviewedButton,
  openPopupReview,
  isMobile = false,
}: Props) {
  if (!showReviewedButton) return null;

  const onClickGoogleReview = () => {
    window.open('https://g.page/r/CdfQwpnlJGLbEAE/review', '_blank');
  };

  if (isMobile) {
    return (
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, textAlign: 'center' }}>
          Votre avis m&apos;intéresse&nbsp;! 🌟
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClickGoogleReview}
            size="small"
            sx={{ flex: 1, py: 1 }}
          >
            <Iconify icon="devicon:google" width={16} sx={{ mr: 0.5 }} />
            Google
          </Button>

          <m.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ flex: 1 }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: 'trustpilot.main',
                width: '100%',
                py: 1,
                '&:hover': {
                  backgroundColor: 'trustpilot.dark',
                },
              }}
              onClick={openPopupReview}
            >
              <Box
                component="img"
                src="/assets/icons/trustpilot.svg"
                alt="Trustpilot"
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              Trustpilot
            </Button>
          </m.div>
        </Stack>
      </Card>
    );
  }

  // Desktop version
  return (
    <Card sx={{ mb: 3, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Votre avis m&apos;intéresse&nbsp;! 🌟
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="outlined" color="inherit" onClick={onClickGoogleReview} sx={{ flex: 1 }}>
          <Iconify icon="devicon:google" width={20} sx={{ mr: 1 }} />
          Laisser un avis Google
        </Button>

        <m.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            rotate: [0, -1, 1, -1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ flex: 1 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'trustpilot.main',
              width: '100%',
              '&:hover': {
                backgroundColor: 'trustpilot.dark',
              },
            }}
            onClick={openPopupReview}
          >
            <Box
              component="img"
              src="/assets/icons/trustpilot.svg"
              alt="Trustpilot"
              sx={{ mr: 1, width: 20, height: 20 }}
            />
            Laisser un avis Trustpilot
          </Button>
        </m.div>
      </Stack>
    </Card>
  );
}
