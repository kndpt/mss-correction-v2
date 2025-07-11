import { ELayoutServiceTier, ILayoutService } from 'src/types/order';
import { LAYOUT_SERVICE_PRICES, LAYOUT_SERVICE_DAYS } from './constants';

export const LAYOUT_SERVICES: ILayoutService[] = [
  {
    id: 'layout-basic',
    tier: ELayoutServiceTier.BASIC,
    name: 'Formatage ePub simple',
    description: 'Format ePub standardisé pour publier rapidement',
    features: [
      'Format ePub optimisé Kindle/Kobo',
      'Table des matières dynamique',
      'Styles de base (titres, paragraphes)',
      'Mise en forme standardisée'
    ],
    price: LAYOUT_SERVICE_PRICES.BASIC,
    estimatedDays: LAYOUT_SERVICE_DAYS.BASIC
  },
  {
    id: 'layout-intermediate',
    tier: ELayoutServiceTier.INTERMEDIATE,
    name: 'Pack "Prêt-à-publier"',
    description: 'Solution complète pour toutes les plateformes',
    features: [
      'Fichiers finaux : ePub, mobi, PDF',
      'Conforme KDP, Kobo, Apple',
      'Pages de garde et mentions légales',
      'PDF impression avec marques de coupe',
      'Guide d\'upload inclus'
    ],
    price: LAYOUT_SERVICE_PRICES.INTERMEDIATE,
    estimatedDays: LAYOUT_SERVICE_DAYS.INTERMEDIATE
  },
  {
    id: 'layout-premium',
    tier: ELayoutServiceTier.PREMIUM,
    name: 'Pack complet sur-mesure',
    description: 'Mise en page professionnelle personnalisée',
    features: [
      'Tous les formats + design personnalisé',
      'Choix typographique et lettrines',
      'Intégration d\'illustrations/cartes',
      'Design harmonisé numérique/papier',
      'Tests multi-plateformes',
      'Support prioritaire en cas de refus'
    ],
    price: LAYOUT_SERVICE_PRICES.PREMIUM,
    estimatedDays: LAYOUT_SERVICE_DAYS.PREMIUM
  }
];

export const getLayoutServiceByTier = (tier: ELayoutServiceTier): ILayoutService | undefined => {
  return LAYOUT_SERVICES.find(service => service.tier === tier);
};

export const formatLayoutServicePrice = (price: number): string => {
  return `${price}€`;
};

export const getLayoutServiceBadgeColor = (tier: ELayoutServiceTier) => {
  switch (tier) {
    case ELayoutServiceTier.BASIC:
      return 'success';
    case ELayoutServiceTier.INTERMEDIATE:
      return 'warning';
    case ELayoutServiceTier.PREMIUM:
      return 'error';
    default:
      return 'default';
  }
};