'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { FirestoreAnalyticsProvider } from 'src/firestore/providers/analytics/analytics-provider';

import { varFade, MotionViewport } from 'src/components/animate';
import AnalyticsWidgetSummary from 'src/components/analytics-widget-summary/analytics-widget-summary';

// ----------------------------------------------------------------------

/**
 * Cancelled because of security rules
 * Need to create API to get data from firestore with admin access.
 * We can't get orders data from client side.
 * @returns
 */
export default function HomeAnalytics() {
  return (
    <FirestoreAnalyticsProvider>
      <Container
        component={MotionViewport}
        sx={{
          position: 'relative',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
        }}
      >
        <Box sx={{ mb: 5 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Quelques chiffres</Typography>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Typography sx={{ color: 'text.secondary' }}>
              Ces chiffres sont en temps réel
            </Typography>
          </m.div>
        </Box>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <m.div variants={varFade().inLeft}>
              <AnalyticsWidgetSummary
                title="Weekly Sales"
                total={714000}
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </m.div>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <m.div variants={varFade().inDown}>
              <AnalyticsWidgetSummary
                title="New Users"
                total={1352831}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </m.div>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <m.div variants={varFade().inUp}>
              <AnalyticsWidgetSummary
                title="Item Orders"
                total={1723315}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </m.div>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <m.div variants={varFade().inRight}>
              <AnalyticsWidgetSummary
                title="Bug Reports"
                total={234}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </FirestoreAnalyticsProvider>
  );
}
