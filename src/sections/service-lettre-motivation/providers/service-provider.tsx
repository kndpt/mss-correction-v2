import React, {
  useMemo,
  Dispatch,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  createContext,
} from 'react';

import {
  pricePerWord,
  priceMultiplierFor2Days,
  priceMultiplierFor3Days,
  priceMultiplierFor1Week,
  priceMultiplierFor2Weeks,
  priceMultiplierFor24Hours,
  timeMultiplierForBeautification,
  priceMultiplierForBeautification,
} from 'src/utils/constants';

import { IServiceOrder } from 'src/types/order';

import { IService, ServiceAction } from './types';

export const initialServiceState: IServiceOrder = {
  text: '',
  uploadedFile: {
    file: null,
    name: '',
  },
  wordsValue: 0,
  price: 0,
  optionDuration: {
    twenty_four_hours: false,
    two_days: false,
    three_days: true,
    one_week: false,
    two_weeks: false,
  },
  optionType: {
    proofreading_and_correction: true,
    beautification: false,
  },
  informations: '',
  title: '',
};

export const reducerService = (state: IServiceOrder, action: ServiceAction): IServiceOrder => {
  switch (action.type) {
    case 'setText': 
      return { ...state, text: action.payload };
    case 'setUploadedFile':
      return { ...state, uploadedFile: action.payload };
    case 'setWordsValue':
      return { ...state, wordsValue: action.payload };
    case 'setPrice':
      return { ...state, price: action.payload };
    case 'setOptionDuration':
      return { ...state, optionDuration: action.payload };
    case 'setOptionType':
      return { ...state, optionType: action.payload };
    case 'setInformations':
      return { ...state, informations: action.payload };
    case 'setTitle':
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export function useServiceState() {
  const state = useContext(ServiceStateContext);
  if (!state) throw new Error('useServiceState must be used within a ServiceProvider');
  return state;
}

export function useServiceDispatch() {
  const dispatch = useContext(ServiceDispatchContext);
  if (!dispatch) throw new Error('useServiceDispatch must be used within a ServiceProvider');
  return dispatch;
}

const ServiceStateContext = createContext<IService | undefined>(undefined);
const ServiceDispatchContext = createContext<Dispatch<ServiceAction> | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ServiceProductProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducerService, initialServiceState);

  const calculateDays = useCallback(() => {
    let daysTotal;
    if (state.optionDuration.twenty_four_hours) {
      daysTotal = 1;
    } else if (state.optionDuration.two_days) {
      daysTotal = 2;
    } else if (state.optionDuration.three_days) {
      daysTotal = 3;
    } else if (state.optionDuration.one_week) {
      daysTotal = 7;
    } else if (state.optionDuration.two_weeks) {
      daysTotal = 14;
    } else {
      throw new Error('Option de délai non prise en charge');
    }
    return Math.ceil(daysTotal);
  }, [
    state.optionDuration.one_week,
    state.optionDuration.three_days,
    state.optionDuration.twenty_four_hours,
    state.optionDuration.two_days,
    state.optionDuration.two_weeks,
  ]);

  const getBeautificationDays = useCallback(() => {
    const days = calculateDays();
    const daysTotal = days * timeMultiplierForBeautification;
    return Math.ceil(daysTotal - days);
  }, [calculateDays]);

  const getTotalDays = useCallback(() => {
    if (state.optionType.beautification) {
      return calculateDays() + getBeautificationDays();
    }
    return calculateDays();
  }, [calculateDays, getBeautificationDays, state.optionType.beautification]);

  const getWordsPrice = useCallback(() => {
    let optionMultiplier = 1;
    let typeMultiplier = 1;

    if (state.optionDuration.two_weeks) {
      optionMultiplier = priceMultiplierFor2Weeks;
    } else if (state.optionDuration.one_week) {
      optionMultiplier = priceMultiplierFor1Week;
    } else if (state.optionDuration.three_days) {
      optionMultiplier = priceMultiplierFor3Days;
    } else if (state.optionDuration.two_days) {
      optionMultiplier = priceMultiplierFor2Days;
    } else if (state.optionDuration.twenty_four_hours) {
      optionMultiplier = priceMultiplierFor24Hours;
    }

    if (state.optionType.beautification) {
      typeMultiplier = priceMultiplierForBeautification;
    }

    const total = pricePerWord * state.wordsValue * optionMultiplier * typeMultiplier;

    return parseFloat(total.toFixed(2));
  }, [
    state.optionDuration.two_weeks,
    state.optionDuration.one_week,
    state.optionDuration.three_days,
    state.optionDuration.twenty_four_hours,
    state.optionDuration.two_days,
    state.optionType.beautification,
    state.wordsValue,
  ]);

  const getDeliveryDate = useCallback(() => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + getTotalDays());

    return currentDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }, [getTotalDays]);

  useEffect(() => {
    const newPrice = getWordsPrice();
    if (newPrice !== state.price) {
      dispatch({ type: 'setPrice', payload: newPrice });
    }
  }, [state.wordsValue, state.optionDuration, state.optionType, getWordsPrice, state.price]);

  const memoizedValue: IService = useMemo(
    () => ({
      state,
      getTotalDays,
      getBeautificationDays,
      getDeliveryDate,
    }),
    [getBeautificationDays, getDeliveryDate, getTotalDays, state]
  );

  return (
    <ServiceDispatchContext.Provider value={dispatch}>
      <ServiceStateContext.Provider value={memoizedValue}>{children}</ServiceStateContext.Provider>
    </ServiceDispatchContext.Provider>
  );
};
