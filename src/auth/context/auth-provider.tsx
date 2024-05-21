'use client';

import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react';
import {
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { DB, AUTH } from 'src/utils/firebase';

import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType, IFirestoreUser } from '../types';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [firestoreUser, setFirestoreUser] = useState<IFirestoreUser | null>(null);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userProfile = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userProfile);

          const profile = docSnap.data();

          dispatch({
            type: Types.INITIAL,
            payload: {
              user: {
                ...user,
                ...profile,
                id: user.uid,
                role: 'admin',
              },
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const getFirestoreUser = useCallback(async (userUid: string) => {
    const docRef = doc(collection(DB, 'users'), userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFirestoreUser(docSnap.data() as IFirestoreUser);
    }
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(AUTH, provider);
    const { user } = userCredential;

    if (user) {
      await setDoc(doc(collection(DB, 'users'), userCredential.user.uid), {
        displayName: user.displayName,
        email: user.email,
        role: 'user',
      });

      await getFirestoreUser(user.uid);
    }
  }, [getFirestoreUser]);

  const setAlreadyReviewed = useCallback(async (userId: string,  value: boolean) => {
    const docRef = doc(collection(DB, 'users'), userId);
    await setDoc(docRef, { alreadyReviewed: value }, { merge: true });
  }, []);

  const loginWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const displayName = `${firstName} ${lastName}`;
      const newUser = await createUserWithEmailAndPassword(AUTH, email, password);
      const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

      await updateProfile(newUser.user, { displayName });

      await setDoc(userProfile, {
        uid: newUser.user?.uid,
        email,
        displayName,
      });

      await getFirestoreUser(newUser.user.uid);
    },
    [getFirestoreUser]
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      firestoreUser,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
      setAlreadyReviewed,
    }),
    [
      status,
      firestoreUser,
      state.user,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
      setAlreadyReviewed,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
