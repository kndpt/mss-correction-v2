import { query, where, getDocs, collection } from 'firebase/firestore';

import { DB } from './firebase';
import { IUserSearchResult } from '../types/manual-order';

/**
 * Recherche un utilisateur par email dans Firebase Auth/Firestore
 * @param email Email de l'utilisateur à rechercher
 * @returns Résultat de la recherche ou null si non trouvé
 */
export async function searchUserByEmail(email: string): Promise<IUserSearchResult | null> {
  try {
    if (!email || !email.includes('@')) {
      return null;
    }

    const usersCollection = collection(DB, 'users');
    const q = query(usersCollection, where('email', '==', email.toLowerCase().trim()));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Prendre le premier résultat (email doit être unique)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
      uid: userDoc.id,
      email: userData.email,
      displayName: userData.displayName || '',
      role: userData.role || 'user',
    };
  } catch (error) {
    console.error('Erreur lors de la recherche utilisateur:', error);
    return null;
  }
}

/**
 * Valide qu'un email est dans un format correct
 * @param email Email à valider
 * @returns true si l'email est valide
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
