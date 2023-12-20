import { EENV } from 'src/types/env';
import { IOptionType } from 'src/types/order';

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
