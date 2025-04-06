import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Theme, Button, SxProps } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

type CircleOverlayProps = {
  size?: number;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  opacity?: number;
  imgSrc?: string;
  text?: string;
  progress?: number;
  sx?: SxProps<Theme>;
};

function CircleOverlay({
  size = 60,
  bottom,
  left,
  right,
  top,
  opacity = 1,
  imgSrc,
  text,
  progress,
  sx,
}: CircleOverlayProps) {
  const strokeWidth = 5;
  const center = size / 2;
  const baseRadius = (size - strokeWidth) / 2;
  const progressRadius = baseRadius + strokeWidth / 2;
  const circumference = 2 * Math.PI * progressRadius;
  const strokeDashoffset = circumference - ((progress || 0) / 100) * circumference;

  return (
    <Box
      sx={{
        ...sx,
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'common.white',
        opacity,
        bottom,
        left,
        right,
        top,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `
          0 0 2px 0 rgba(145, 158, 171, 0.2),
          0 12px 24px -4px rgba(145, 158, 171, 0.12)
        `,
      }}
    >
      {progress && (
        <Box
          component="svg"
          width={size + strokeWidth}
          height={size + strokeWidth}
          sx={{
            transform: 'rotate(-90deg)',
            position: 'absolute',
            top: strokeWidth / -2,
            left: strokeWidth / -2,
          }}
        >
          <circle
            cx={center + strokeWidth / 2}
            cy={center + strokeWidth / 2}
            r={progressRadius}
            fill="none"
            stroke="url(#blueGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1B5EBE" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </Box>
      )}

      {/* eslint-disable-next-line no-nested-ternary */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="circle-overlay"
          sx={{
            width: '50%',
            height: '50%',
            objectFit: 'contain',
          }}
        />
      ) : text ? (
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: 'center',
            fontSize: size && size < 80 ? '0.75rem' : '0.875rem',
            fontWeight: 800,
            lineHeight: 1.2,
            p: 1,
          }}
        >
          {text}
        </Typography>
      ) : null}
    </Box>
  );
}

type TextBoxOverlayProps = {
  width?: number;
  height?: number;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  text: string;
  sx?: SxProps<Theme>;
};

function TextBoxOverlay({
  width = 200,
  height = 60,
  bottom,
  left,
  right,
  top,
  text,
  sx,
}: TextBoxOverlayProps) {
  return (
    <Box
      sx={{
        ...sx,
        position: 'absolute',
        width,
        height,
        borderRadius: 1.2,
        backgroundColor: 'common.white',
        bottom,
        left,
        right,
        top,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'center',
        boxShadow: `
          0 0 2px 0 rgba(145, 158, 171, 0.2),
          0 12px 24px -4px rgba(145, 158, 171, 0.12)
        `,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'primary.main',
        }}
      />
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

export default function CorrectionMemoireHero() {
  const mdUp = useResponsive('up', 'md');

  const renderBtn = (
    <Button
      color="inherit"
      variant="contained"
      size="large"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.tarifs}
    >
      Simuler la correction de mon mémoire
    </Button>
  );

  const renderDescription = (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Correction de mémoire de fin d&apos;études
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
            mt: {
              xs: 5,
              md: 0,
            },
          }}
        >
          Réussissez votre mémoire de fin d&apos;études avec brio grâce à une correction
          professionnelle. Je corrige les erreurs, améliore la clarté et la cohérence, et assure que
          votre travail soit prêt à impressionner. Réussissez en toute confiance !
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}> {renderBtn} </m.div>
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Image
        disabledEffect
        alt="grid"
        src="/assets/images/home/hero-key-visual-v2.webp"
        sx={{
          width: { xs: '80%', md: '100%' },
          margin: { xs: '0 auto', md: 0 },
        }}
      />

      <CircleOverlay
        size={65}
        bottom={0}
        left="70%"
        imgSrc="/assets/images/home/writing-hand.png"
        sx={{
          transform: 'translateX(-50%)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'translateX(-50%) scale(1)',
              boxShadow: '0 0 0 0 rgba(27, 94, 190, 0.4)',
            },
            '50%': {
              transform: 'translateX(-50%) scale(1.1)',
              boxShadow: '0 0 0 10px rgba(27, 94, 190, 0)',
            },
            '100%': {
              transform: 'translateX(-50%) scale(1)',
              boxShadow: '0 0 0 0 rgba(27, 94, 190, 0.4)',
            },
          },
        }}
      />
      <CircleOverlay
        size={65}
        bottom="65%"
        left="95%"
        imgSrc="/assets/images/home/doc.png"
        sx={{
          transform: 'translateX(-50%)',
        }}
      />
      <CircleOverlay
        size={65}
        top="10%"
        right="47%"
        text="95%"
        progress={95}
        sx={{
          transform: 'translateX(-100%)',
        }}
      />

      <Box sx={{ transform: 'translateX(-50%)', display: { xs: 'none', md: 'block' } }}>
        <TextBoxOverlay
          width={250}
          height={40}
          bottom="20%"
          right="100%"
          text="Rigueur académique garantie"
          sx={{
            transform: { xs: 'translateX(-100%)', md: 'translateX(-80%)', lg: 'translateX(-130%)' },
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 0, md: 4 }}>
        <Grid item xs={12} md={6}>
          {renderDescription}
        </Grid>
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inRight}>{renderContent}</m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
