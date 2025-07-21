import { addDoc, Timestamp, collection } from 'firebase/firestore';

import { DB } from 'src/utils/firebase';
import { searchUserByEmail } from 'src/utils/user-search';
import {
  pricePerWord,
  priceMultiplierFor2Days,
  priceMultiplierFor3Days,
  priceMultiplierFor1Week,
  priceMultiplierFor2Weeks,
  priceMultiplierFor3Weeks,
  priceMultiplierFor24Hours,
  timeMultiplierForBeautification,
  priceMultiplierForBeautification,
} from 'src/utils/constants';

import { IOrder, EOrderStatus, IServiceOrder, ITimelineItem } from 'src/types/order';
import {
  IManualOrderForm,
  IManualOrderValidation,
  IManualOrderCalculation,
  IManualOrderCreationData,
} from 'src/types/manual-order';

/**
 * Calcule les données automatiques d'une commande manuelle
 */
export function calculateManualOrder(form: IManualOrderForm): IManualOrderCalculation {
  // Calcul des jours
  let baseDays = 3; // défaut
  if (form.optionDuration.twenty_four_hours) baseDays = 1;
  else if (form.optionDuration.two_days) baseDays = 2;
  else if (form.optionDuration.three_days) baseDays = 3;
  else if (form.optionDuration.one_week) baseDays = 7;
  else if (form.optionDuration.two_weeks) baseDays = 14;
  else if (form.optionDuration.three_weeks) baseDays = 21;

  // Calcul jours embellissement
  const beautificationDays = form.optionType.beautification
    ? Math.ceil(baseDays * timeMultiplierForBeautification) - baseDays
    : 0;

  const totalDays = baseDays + beautificationDays;

  // Calcul du prix si pas de prix manuel
  let price = form.customPrice || 0;

  if (!form.customPrice) {
    let durationMultiplier = 1;
    if (form.optionDuration.three_weeks) durationMultiplier = priceMultiplierFor3Weeks;
    else if (form.optionDuration.two_weeks) durationMultiplier = priceMultiplierFor2Weeks;
    else if (form.optionDuration.one_week) durationMultiplier = priceMultiplierFor1Week;
    else if (form.optionDuration.three_days) durationMultiplier = priceMultiplierFor3Days;
    else if (form.optionDuration.two_days) durationMultiplier = priceMultiplierFor2Days;
    else if (form.optionDuration.twenty_four_hours) durationMultiplier = priceMultiplierFor24Hours;

    const typeMultiplier = form.optionType.beautification ? priceMultiplierForBeautification : 1;

    price = parseFloat(
      (pricePerWord * form.wordsValue * durationMultiplier * typeMultiplier).toFixed(2)
    );
  }

  // Calcul date de livraison
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + totalDays);

  return {
    price,
    totalDays,
    deliveryDate,
    beautificationDays: beautificationDays > 0 ? beautificationDays : undefined,
  };
}

/**
 * Valide les données d'une commande manuelle
 */
export function validateManualOrder(form: IManualOrderForm): IManualOrderValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validation des champs requis
  if (!form.firstName?.trim()) errors.push('Le prénom est requis');
  if (!form.lastName?.trim()) errors.push('Le nom est requis');
  if (!form.email?.trim()) errors.push("L'email est requis");
  if (!form.wordsValue || form.wordsValue < 500)
    errors.push('Le nombre de mots doit être supérieur à 500');
  if (!form.title?.trim()) errors.push('Le titre est requis');

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.email && !emailRegex.test(form.email)) {
    errors.push("L'email n'est pas dans un format valide");
  }

  // Validation prix manuel
  if (form.customPrice && form.customPrice < 0) {
    errors.push('Le prix manuel ne peut pas être négatif');
  }

  // Validation options
  const durationOptions = Object.values(form.optionDuration);
  if (!durationOptions.some((option) => option)) {
    errors.push('Une option de durée doit être sélectionnée');
  }

  const typeOptions = Object.values(form.optionType);
  if (!typeOptions.some((option) => option)) {
    errors.push('Une option de type doit être sélectionnée');
  }

  // Warnings
  if (form.wordsValue > 100000) {
    warnings.push('Nombre de mots très élevé, vérifiez la durée choisie');
  }

  if (form.customPrice && form.customPrice < 5) {
    warnings.push('Prix manuel très bas');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Crée une commande manuelle dans Firestore
 */
export async function createManualOrder(
  form: IManualOrderForm,
  filePath?: string
): Promise<string> {
  // Validation
  const validation = validateManualOrder(form);
  if (!validation.isValid) {
    throw new Error(`Données invalides: ${validation.errors.join(', ')}`);
  }

  // Recherche de l'utilisateur
  const user = await searchUserByEmail(form.email);
  if (!user) {
    throw new Error(`Aucun utilisateur trouvé avec l'email: ${form.email}`);
  }

  // Calculs automatiques
  const calculation = calculateManualOrder(form);

  // Données de création
  const creationData: IManualOrderCreationData = {
    ...form,
    userId: user.uid,
    calculation,
    filePath,
  };

  // Création du service order
  const serviceOrder: IServiceOrder = {
    uploadedFile: {
      file: null,
      name: filePath ? filePath.split('/').pop() || '' : '',
    },
    wordsValue: creationData.wordsValue,
    price: creationData.calculation.price,
    optionDuration: creationData.optionDuration,
    optionType: creationData.optionType,
    informations: creationData.informations,
    title: creationData.title,
  };

  // Timeline initiale
  const initialTimeline: ITimelineItem[] = [
    {
      title: 'Commande créée manuellement',
      description: `Commande créée par l'admin à ${new Date().toLocaleString('fr-FR')}`,
      createdAt: Timestamp.now(),
    },
    {
      title: 'Commande en cours',
      description: 'La correction de votre document a commencé',
      createdAt: Timestamp.now(),
    },
  ];

  // Création de l'ordre
  const order: Omit<IOrder, 'id'> = {
    email: creationData.email,
    endDate: Timestamp.fromDate(creationData.calculation.deliveryDate),
    filePath: filePath || '',
    intent: '', // Pas d'intent Stripe pour les commandes manuelles
    purchaseTimestamp: Timestamp.now(),
    sessionId: `manual_${Date.now()}`, // ID unique pour les commandes manuelles
    status: EOrderStatus.IN_PROGRESS, // Directement en cours
    userId: creationData.userId,
    timeline: initialTimeline,
    service: serviceOrder,
    displayName: `${creationData.firstName} ${creationData.lastName}`,
    fixedFilePath: '',
  };

  // Sauvegarde en Firestore
  const docRef = await addDoc(collection(DB, 'orders'), order);

  return docRef.id;
}
