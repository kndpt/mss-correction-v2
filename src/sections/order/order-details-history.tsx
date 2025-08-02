import { Timestamp } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import { ITimelineItem } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  timeline: ITimelineItem[];
  purchaseTime: Timestamp;
  endDate: Timestamp;
};

export default function OrderDetailsHistory({ timeline, purchaseTime, endDate }: Props) {
  const getStatusIcon = (index: number, isLast: boolean) => {
    if (isLast) {
      return 'solar:check-circle-bold';
    }
    return 'solar:clock-circle-outline';
  };

  const getStatusColor = (index: number, isLast: boolean) => {
    if (isLast) {
      return 'success.main';
    }
    return 'grey.400';
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Historique
      </Typography>

      {/* Key Dates */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card variant="outlined" sx={{ flex: 1, p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: 'default', width: 40, height: 40 }}>
              <Iconify icon="solar:calendar-add-bold" width={20} />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Commande passée
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {fDateTime(purchaseTime.toDate())}
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Card variant="outlined" sx={{ flex: 1, p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: 'default', width: 40, height: 40 }}>
              <Iconify icon="solar:delivery-bold" width={20} />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Livraison estimée
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {fDateTime(endDate.toDate())}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>

      {/* Timeline */}
      <Stack spacing={2}>
        {timeline.map((item, index) => {
          const isLast = index === timeline.length - 1;

          return (
            <Stack key={item.title} direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: getStatusColor(index, isLast),
                  width: 32,
                  height: 32,
                  mt: 0.5,
                }}
              >
                <Iconify icon={getStatusIcon(index, isLast)} width={16} />
              </Avatar>

              <div className="flex-1 min-w-0">
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>

                  <Chip
                    label={fDateTime(item.createdAt ? item.createdAt.toDate() : new Date())}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Stack>

                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                )}
              </div>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}
