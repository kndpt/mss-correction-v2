'use client';

import React from 'react';

import {
  Box,
  Card,
  Chip,
  Stack,
  Button,
  IconButton,
  Typography,
  LinearProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { fDateTime } from 'src/utils/format-time';
import { getOrderStatus, getOrderStatusChipColor } from 'src/utils/order';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { EOrderStatus } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  order: any;
  timeProgress: any;
  showProgress: boolean;
  handleDownloadFile: (path: string) => void;
  isMobile: boolean;
};

export default function OrderHeader({
  order,
  timeProgress,
  showProgress,
  handleDownloadFile,
  isMobile,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (isMobile) {
    return (
      <Card sx={{ mb: 2, overflow: 'visible', padding: 0.75 }}>
        {/* Compact Header */}
        <Stack spacing={2} sx={{ p: 2 }}>
          {/* Top Row - Back + Status */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton href={paths.dashboard.order.root} size="small">
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
            <Box sx={{ flex: 1 }} />
            <Label
              variant="soft"
              color={getOrderStatusChipColor(order.status)}
              sx={{ fontSize: '0.875rem', fontWeight: 600, px: 2, py: 0.75 }}
            >
              {getOrderStatus(order.status).toUpperCase()}
            </Label>
          </Stack>

          {/* Main Content */}
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {order.service?.title || 'Correction de document'}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {order.service?.wordsValue?.toLocaleString() || 0} mots • {order.service?.price}€
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Button
                size="small"
                variant="text"
                color="inherit"
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ p: 0.5, minWidth: 'auto' }}
              >
                <Iconify
                  icon={isExpanded ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
                  width={16}
                />
              </Button>
            </Stack>
          </Stack>

          {/* Progress Bar - Always visible if active */}
          {showProgress && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Progression
                </Typography>
                <Typography
                  variant="caption"
                  color={timeProgress.isOverdue ? 'error.main' : 'text.secondary'}
                  sx={{ fontWeight: 600 }}
                >
                  {timeProgress.timeLeft}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={timeProgress.progress}
                color={timeProgress.progressColor}
                sx={{ height: 6, borderRadius: 3, backgroundColor: 'grey.200' }}
              />
            </Box>
          )}

          {/* Download Button - Compact */}
          {order.status === EOrderStatus.DONE && order.fixedFilePath && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="solar:download-bold" width={16} />}
              onClick={() => handleDownloadFile(order.fixedFilePath!)}
              sx={{ alignSelf: 'flex-start' }}
            >
              Fichier corrigé
            </Button>
          )}
        </Stack>

        {/* Expanded Details */}
        {isExpanded && (
          <Box sx={{ px: 2, pb: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
            <Stack spacing={1.5} sx={{ typography: 'body2' }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary" fontSize="0.875rem">
                  Nom
                </Typography>
                <Typography sx={{ fontWeight: 500 }} fontSize="0.875rem">
                  {order.displayName}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary" fontSize="0.875rem">
                  Date
                </Typography>
                <Typography sx={{ fontWeight: 500 }} fontSize="0.875rem">
                  {fDateTime(order.purchaseTimestamp.toDate())}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}
      </Card>
    );
  }

  // Desktop version
  return (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <Stack spacing={3} sx={{ p: 3, pt: 1 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          className="pt-2"
        >
          <Stack spacing={1}>
            <div className="flex items-center gap-2">
              <IconButton href={paths.dashboard.order.root} className="rounded-full">
                <Iconify icon="eva:arrow-ios-back-fill" />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {fDateTime(order.purchaseTimestamp.toDate())} • {order.displayName}
              </Typography>
            </div>
          </Stack>

          <Label
            variant="soft"
            color={getOrderStatusChipColor(order.status)}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              px: 2.5,
              py: 1,
            }}
          >
            {getOrderStatus(order.status).toUpperCase()}
          </Label>
        </Stack>

        {/* Progress Bar */}
        {showProgress && (
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Progression
              </Typography>
              <Typography
                variant="subtitle2"
                color={timeProgress.isOverdue ? 'error.main' : 'text.secondary'}
                sx={{ fontWeight: 600 }}
              >
                {timeProgress.timeLeft}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={timeProgress.progress}
              color={timeProgress.progressColor}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
              }}
            />
          </Box>
        )}

        {/* Main Content */}
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {order.service?.title || 'Correction de document'}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={<Iconify icon="solar:euro-outline" width={18} />}
              label={`${order.service?.price}€`}
              variant="filled"
              color="default"
              sx={{
                py: 2,
                px: 1,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            />
            <Chip
              icon={<Iconify icon="solar:document-text-outline" width={18} />}
              label={`${order.service?.wordsValue?.toLocaleString() || 0} mots`}
              variant="outlined"
              sx={{
                py: 2,
                px: 1,
                fontSize: '0.875rem',
              }}
            />
          </Stack>
        </Stack>

        {/* Download Button for finished orders */}
        {order.status === EOrderStatus.DONE && order.fixedFilePath && (
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:download-bold" />}
            onClick={() => handleDownloadFile(order.fixedFilePath!)}
            sx={{ alignSelf: 'flex-start' }}
          >
            Télécharger le fichier corrigé
          </Button>
        )}
      </Stack>
    </Card>
  );
}
