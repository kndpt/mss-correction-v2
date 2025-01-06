import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';
import {
  Link,
  Theme,
  Avatar,
  Button,
  SxProps,
  Typography,
  AvatarGroup,
  avatarClasses,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

type MInviewProps = BoxProps & {
  children: React.ReactNode;
};

function MInview({ children, component = m.div }: MInviewProps) {
  return (
    <Box component={component} variants={varFade({ distance: 24 }).inUp}>
      {children}
    </Box>
  );
}

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

export default function CorrectionRomanHeroV2() {
  const renderRatings = (
    <MInview>
      <Box
        gap={1.5}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        sx={{
          typography: 'subtitle2',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <AvatarGroup sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}>
          {[...Array(3)].map((_, index) => {
            const image = `/assets/images/avatar/avatar-${index + 1}.webp`;
            return <Avatar key={index} src={image} />;
          })}
        </AvatarGroup>
        <Link
          href="https://comeup.com/fr/@oceane-mss"
          target="_blank"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="subtitle2">700+ clients satisfaits</Typography>
        </Link>
      </Box>
    </MInview>
  );

  const renderBtn = (
    <Button
      color="inherit"
      size="large"
      variant="contained"
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      href={paths.tarifs}
      sx={{ px: 6 }}
    >
      Lancer la simulation
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
        {renderRatings}
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: { md: 5 },
            fontWeight: 800,
          }}
        >
          Corrigez votre roman et captivez vos lecteurs
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
            lineHeight: 1.7,
          }}
        >
          Je détecte chaque erreur avec précision et affine votre texte pour garantir une lecture
          impeccable et captivante. <br />
          Même si c&apos;est votre premier roman. 🙂
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
        src="/assets/images/home/hero-key-visual.png"
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
        text="80%"
        progress={80}
        sx={{
          transform: 'translateX(-50%)',
        }}
      />

      <TextBoxOverlay
        width={250}
        height={40}
        bottom="20%"
        right="20%"
        text="100% des fautes éliminées"
        sx={{
          transform: 'translateX(-50%)',
        }}
      />
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
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={{ md: 0 }}
        sx={{ mt: 4 }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: 2, md: 1 },
          }}
        >
          {renderDescription}
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: 1, md: 2 },
            mb: { xs: 4, md: 0 },
          }}
        >
          <m.div variants={varFade().inRight}>{renderContent}</m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
