import { EENV } from 'src/types/env';
import { IOptionType } from 'src/types/order';
import { ESimpleAnalyticsEvent } from 'src/types/simple-analytics-event';

export const getDateTime = () => {
  const currentDate = new Date();

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  // @ts-ignore
  return currentDate.toLocaleString('fr-FR', options);
};

export const getCorrectionType = (option: IOptionType) => {
  if (option.beautification) return 'Correction et relecture & Embellissement';
  if (option.proofreading_and_correction) return 'Correction et relecture';
};

export const isEnvironment = (env: EENV) => {
  const actualEnv = process.env.NEXT_PUBLIC_ENV;
  return actualEnv === env;
};

export const generateRandomCoverLink = (): string => {
  const randomNumber = Math.floor(Math.random() * 24) + 1;
  return `/assets/cover/cover_${randomNumber}.jpg`;
};

export const sendSimpleAnalyticsEvent = (
  event: ESimpleAnalyticsEvent,
  uniqueSession: boolean = true
) => {
  // If uniqueSession is true, verify if the event was already triggered
  if (uniqueSession) {
    const eventKey = `event_${event}`;
    const hasTriggered = sessionStorage.getItem(eventKey);

    if (hasTriggered) {
      // Event already triggered in this session, do not send again
      return;
    }

    // Store the event in sessionStorage to mark it as triggered
    sessionStorage.setItem(eventKey, 'true');
  }

  // Sending the event to Simple Analytics
  if (window && window.sa_event) {
    window.sa_event(event);
  }
};
