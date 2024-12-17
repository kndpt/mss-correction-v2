import { Timestamp } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import Button from '@mui/material/Button';
import TimelineDot from '@mui/lab/TimelineDot';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';
import { getFormattedDate } from 'src/utils/order';

import { ITimelineItem } from 'src/types/order';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  timeline: ITimelineItem[];
  purchaseTime: Timestamp;
  endDate: Timestamp;
  showReviewedButton: boolean;
  openPopupReview: () => void;
};

export default function OrderDetailsHistory({
  timeline,
  purchaseTime,
  endDate,
  showReviewedButton,
  openPopupReview,
}: Props) {
  const onClickGoogleReview = () => {
    window.open('https://g.page/r/CdfQwpnlJGLbEAE/review', '_blank');
  };

  const renderSummary = (
    <Stack
      spacing={2}
      component={Paper}
      variant="outlined"
      sx={{
        p: 2.5,
        minWidth: 260,
        flexShrink: 0,
        borderRadius: 2,
        typography: 'body2',
        borderStyle: 'dashed',
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Commande passée</Box>
        {fDateTime(purchaseTime.toDate())}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>Date de livraison estimée</Box>
        {fDateTime(endDate.toDate())}
      </Stack>
    </Stack>
  );

  const renderTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timeline.map((item, index) => {
        const lastTimeline = index === timeline.length - 1;

        return (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot
                color={(lastTimeline && 'primary') || 'grey'}
                sx={{ bgcolor: lastTimeline ? '#212B36' : '#E0E0E0' }}
              />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item.title}</Typography>

              <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                {getFormattedDate(item.createdAt ? item.createdAt.toDate() : new Date())}
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return (
    <Card>
      <CardHeader title="History" />
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}

        {renderSummary}
      </Stack>
      {showReviewedButton && (
        <Stack sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" fullWidth color="inherit" onClick={onClickGoogleReview}>
            <Iconify icon="devicon:google" width={20} sx={{ mr: 2 }} />
            Laisser un avis Google
          </Button>
        </Stack>
      )}
    </Card>
  );
}
