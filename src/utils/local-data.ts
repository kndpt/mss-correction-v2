import { TDurationType, TDurationOption } from 'src/types/order';

export const durationOptions: TDurationOption[] = [
  {
    id: 'twenty_four_hours',
    name: '24 heures',
  },
  {
    id: 'two_days',
    name: '2 jours',
  },
  {
    id: 'three_days',
    name: '3 jours',
  },
  {
    id: 'one_week',
    name: '1 semaine',
  },
  {
    id: 'two_weeks',
    name: '2 semaines',
  },
];

export const typeOptions: TDurationType[] = [
  {
    id: 'proofreading_and_correction',
    name: 'Relecture et correction',
    description: 'Correction simple',
    icon: 'solar:pen-new-square-linear',
  },
  {
    id: 'beautification',
    name: 'Relecture et correction + Embellissement',
    description:
      "Révision de la ponctuation, suppression des répétitions, changement de certains mots en mots plus jolis à l'écrit, et reformulation des phrases pas claires",
    icon: 'solar:course-up-linear',
  },
];
