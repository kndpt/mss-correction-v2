import { IOptionType, IOptionDuration } from './order';

// Interface pour la création d'une commande manuelle par l'admin
export interface IManualOrderForm {
  // Données client
  firstName: string;
  lastName: string;
  email: string;

  // Données service
  wordsValue: number;
  customPrice?: number; // Prix manuel optionnel, sinon calcul auto
  optionDuration: IOptionDuration;
  optionType: IOptionType;
  title: string;
  informations: string;

  // Fichier optionnel
  uploadedFile?: File;
}

// Interface pour la recherche d'utilisateur
export interface IUserSearchResult {
  uid: string;
  email: string;
  displayName: string;
  role: string;
}

// Interface pour les données calculées
export interface IManualOrderCalculation {
  price: number;
  totalDays: number;
  deliveryDate: Date;
  beautificationDays?: number;
}

// Interface pour la création finale de la commande
export interface IManualOrderCreationData extends IManualOrderForm {
  userId: string;
  calculation: IManualOrderCalculation;
  filePath?: string;
}

// Types pour la validation
export interface IManualOrderValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
