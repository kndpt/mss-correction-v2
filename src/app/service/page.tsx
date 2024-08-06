'use client';

import { useEffect } from 'react';

import { sendSimpleAnalyticsEvent } from 'src/utils/utils';

import ServiceView from 'src/sections/service/service-view';

import { ESimpleAnalyticsEvent } from 'src/types/simple-analytics-event';

export default function ServicePage() {
  useEffect(() => {
    sendSimpleAnalyticsEvent(ESimpleAnalyticsEvent.PAGE_VIEWED_SERVICE);
  }, []);

  return <ServiceView />;
}
