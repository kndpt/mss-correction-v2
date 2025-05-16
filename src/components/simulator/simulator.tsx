import React, { useEffect } from 'react';

import { Stack } from '@mui/system';
import Link from '@mui/material/Link';
import { Box, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import {
  maxWords,
  maxWordsFor1Week,
  maxWordsFor2Days,
  maxWordsFor3Days,
  maxWordsFor2Weeks,
  maxWordsFor3Weeks,
  maxWordsFor24Hours,
} from 'src/utils/constants';

import { IOptionType, IOptionDuration, IOptionDurationLimits } from 'src/types/order';

import Image from '../image';
import WordCounterDialog from './word-counter-dialog';
import SimulatorSummaryInfo from './simulator-summary-info';
import SimulatorCallToAction from './simulator-call-to-actions';
import SimulatorTypeCorrection from './simulator-type-correction';
import SimulatorTimeCounter from './simulator-time-counter/simulator-time-counter';
import SimulatorWordCounter from './simulator-word-counter/simulator-word-counter';
import SimulatorDeliveryInfo from './simulator-delivery-info/simulator-delivery-info';
import { useServiceState, useServiceDispatch } from '../../providers/service/service-provider';

// ----------------------------------------------------------------------

type Props = {
  isCommand?: boolean;
};

// TODO: If we are in command, and service.wordsValue is 0, showing popup to ask for words value
// Because we havn't the words value in this case (maybe a .doc file)
// Tell the user to enter the words value manually because we can't get it from the file

export default function Simulator({ isCommand }: Props) {
  const { state: service, getBeautificationDays, getTotalDays } = useServiceState();
  const {
    onFalse: onWordCounterFalse,
    value: isWordCounterOpen,
    setValue: setWordCounterValue,
  } = useBoolean();
  const dispatch = useServiceDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isCommand) dispatch({ type: 'setWordsValue', payload: 500 });
  }, [dispatch, isCommand]);

  useEffect(() => {
    if (!isCommand) return;

    if (service.wordsValue === 0) {
      setWordCounterValue(true);
    }
  }, [isCommand, service.wordsValue, setWordCounterValue]);

  const handleChangeWords = (value: number) => {
    try {
      dispatch({
        type: 'setWordsValue',
        payload: Math.min(value, maxWords),
      });

      // After updating word count, check if we need to adjust the duration option
      setTimeout(() => selectValidDurationOption(), 0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOptionDurationChange = (option: keyof IOptionDuration) => {
    // if the option is already checked, we don't want to uncheck it
    if (service.optionDuration[option]) return;

    const resetState: IOptionDuration = Object.keys(service.optionDuration).reduce((acc, key) => {
      acc[key as keyof IOptionDuration] = false;
      return acc;
    }, {} as IOptionDuration);

    dispatch({
      type: 'setOptionDuration',
      payload: { ...resetState, [option]: true },
    });
  };

  const handleOptionTypeChange = (option: keyof IOptionType) => {
    if (service.optionType[option]) return;

    const resetState: IOptionType = Object.keys(service.optionType).reduce((acc, key) => {
      acc[key as keyof IOptionType] = false;
      return acc;
    }, {} as IOptionType);

    dispatch({
      type: 'setOptionType',
      payload: { ...resetState, [option]: true },
    });
  };

  const limits: IOptionDurationLimits = {
    twenty_four_hours: maxWordsFor24Hours,
    two_days: maxWordsFor2Days,
    three_days: maxWordsFor3Days,
    one_week: maxWordsFor1Week,
    two_weeks: maxWordsFor2Weeks,
    three_weeks: maxWordsFor3Weeks,
  };

  const ids = Object.keys(limits) as (keyof IOptionDuration)[];

  const getDisability = (id: keyof IOptionDuration) => {
    const index = ids.findIndex((key) => key === id);
    if (index !== -1 && service.wordsValue > limits[id]) {
      // Instead of automatically selecting the next option which can cause an infinite loop,
      // we'll just return true to disable this option
      return true;
    }

    return false;
  };

  // Add a separate function to find a valid duration option based on word count
  const selectValidDurationOption = () => {
    // Find the first duration option that's valid for the current word count
    const validOption = ids.find((id) => service.wordsValue <= limits[id]) || 'two_weeks';

    // Only dispatch if the current selection is invalid
    const currentSelection = ids.find((id) => service.optionDuration[id]);
    if (currentSelection && service.wordsValue > limits[currentSelection]) {
      const resetState: IOptionDuration = Object.keys(service.optionDuration).reduce((acc, key) => {
        acc[key as keyof IOptionDuration] = false;
        return acc;
      }, {} as IOptionDuration);

      dispatch({
        type: 'setOptionDuration',
        payload: { ...resetState, [validOption]: true },
      });
    }
  };

  const goToCommand = async () => router.push(paths.service);

  const renderLeft = (
    <Stack
      alignItems="start"
      sx={{
        width: {
          xs: '100%',
        },
        pr: {
          md: 4,
        },
      }}
    >
      <Typography variant="h1" sx={{ mb: 4, fontSize: '32px!important', fontWeight: '700' }}>
        Simulez le tarif de la correction
      </Typography>
      {!isCommand && (
        <SimulatorWordCounter
          value={service.wordsValue}
          onChange={handleChangeWords}
          sx={{ pb: 4 }}
        />
      )}
      <SimulatorTimeCounter
        getDisability={getDisability}
        value={service.optionDuration}
        handleOptionDurationChange={handleOptionDurationChange}
        sx={{ pb: 4 }}
      />
      <SimulatorTypeCorrection
        value={service.optionType}
        handleOptionTypeChange={handleOptionTypeChange}
        getBeautificationDays={getBeautificationDays}
        sx={{
          pb: {
            xs: 4,
            md: 0,
          },
        }}
      />
    </Stack>
  );

  const renderRight = (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{
        pt: 4,
        pb: {
          md: 4,
        },
        pl: {
          md: 4,
        },
        width: {
          xs: '100%',
        },
      }}
    >
      <SimulatorDeliveryInfo sx={{ pb: 4 }} />
      <SimulatorSummaryInfo
        wordsPrice={service.price.toString()}
        wordsValue={service.wordsValue}
        number={getTotalDays()}
        options={service.optionType}
        sx={{ pb: 4 }}
      />
      {!isCommand && (
        <SimulatorCallToAction
          handleOrder={goToCommand}
          handleContact={() => {
            //  event('button_click', { label: 'contact_me' });
            window.open('mailto:contact@msscorrection.fr');
          }}
          disabled={false}
        />
      )}
    </Stack>
  );

  return (
    <>
      <Box display="grid" sx={{ gridTemplateColumns: { md: '2fr 1fr', xs: '1fr' }, px: 3, py: 2 }}>
        <WordCounterDialog
          onClose={onWordCounterFalse}
          open={isWordCounterOpen}
          handleSendWordsValue={handleChangeWords}
        />
        {renderLeft}

        {renderRight}
      </Box>
      <Box
        sx={{
          mt: 0,
          mb: { xs: 3, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '100%',
        }}
      >
        <Typography variant="caption">Moyens de paiements disponibles avec </Typography>
        <Link href="https://stripe.com/fr" target="_blank">
          {' '}
          <Typography variant="caption">Stripe</Typography>
        </Link>
        <Link href="https://stripe.com/fr" target="_blank">
          <Image
            alt="payment methods"
            src="/assets/images/payment-methods.png"
            width={300}
            sx={{ textAlign: 'center', cursor: 'pointer' }}
          />
        </Link>
      </Box>
    </>
  );
}
