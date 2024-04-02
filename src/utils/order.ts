import { LabelColor } from 'src/components/label';

import { IOptionType, EOrderStatus, IOptionDuration } from 'src/types/order';

export const getOrderStatus = (status: EOrderStatus): string => {
  switch (status) {
    case EOrderStatus.PAID:
      return 'En attente';
    case EOrderStatus.FAILED:
      return 'Erreur';
    case EOrderStatus.IN_PROGRESS:
      return 'En cours';
    case EOrderStatus.CANCELED:
      return 'Annulée';
    case EOrderStatus.REFUNDED:
      return 'Remboursée';
    case EOrderStatus.DONE:
      return 'Terminée';
    case EOrderStatus.PENDING:
      return 'Non payée';
    default:
      return '';
  }
};

export const getOrderStatusChipColor = (status: EOrderStatus): LabelColor => {
  switch (status) {
    case EOrderStatus.PAID:
      return 'secondary';
    case EOrderStatus.FAILED:
      return 'error';
    case EOrderStatus.IN_PROGRESS:
      return 'info';
    case EOrderStatus.CANCELED:
      return 'warning';
    case EOrderStatus.REFUNDED:
      return 'warning';
    case EOrderStatus.DONE:
      return 'default';
    case EOrderStatus.PENDING:
      return 'default';
    default:
      return 'default';
  }
};

export const getOrderType = (type: IOptionType): string =>
  `${type.proofreading_and_correction ? 'Correction et embellissement' : 'Correction'}`;

export const getOrderDuration = (duration: IOptionDuration): string => {
  if (duration.twenty_four_hours) return '24h';
  if (duration.two_days) return '2 jours';
  if (duration.three_days) return '3 jours';
  if (duration.one_week) return '1 semaine';
  return '';
};

export const getFormattedDate = (date: Date) =>
  `Le ${date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} à ${date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
