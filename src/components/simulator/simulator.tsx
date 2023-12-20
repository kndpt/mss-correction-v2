import { useEffect } from 'react';

import { Stack } from '@mui/system';
import { Box, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { IOptionType, IOptionDuration } from 'src/types/order';

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
export default function Simulator({ isCommand }: Props) {
  const { state: service, getBeautificationDays, getTotalDays } = useServiceState();
  const dispatch = useServiceDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isCommand) dispatch({ type: 'setWordsValue', payload: 500 });
  }, [dispatch, isCommand]);

  const handleChangeWords = (value: number) => {
    try {
      dispatch({
        type: 'setWordsValue',
        payload: value,
      });
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
      <Typography variant="h3" sx={{ mb: 4 }}>
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
            window.open('mailto:mss.correction@gmail.com');
          }}
          disabled={false}
        />
      )}
    </Stack>
  );

  return (
    <Box
      display="grid"
      sx={{ gridTemplateColumns: { md: '2fr 1fr', xs: '1fr' }, px: { md: 3 }, py: 2 }}
    >
      {renderLeft}

      {renderRight}
    </Box>
  );
}
