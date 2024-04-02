import { useMemo, useCallback, createContext } from 'react';
import { ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';

import { STORAGE } from 'src/utils/firebase';

export type StorageContextType = {
  uploadFile: (path: string, file: File) => Promise<void>;
  uploadTextFile: (path: string, content: string) => Promise<void>;
  downloadFile: (path: string) => Promise<string | null>;
};

export const FirebaseStorageContext = createContext<StorageContextType>({} as StorageContextType);

type Props = {
  children: React.ReactNode;
};

export const FirebaseStorageProvider = ({ children }: Props) => {
  const uploadFile = useCallback(async (path: string, file: File) => {
    const storageRef = ref(STORAGE, `${path}`);
    await uploadBytes(storageRef, file);
  }, []);

  const downloadFile = useCallback(async (path: string) => {
    try {
      const storageRef = ref(STORAGE, `${path}`);
      const url = await getDownloadURL(storageRef);

      const a = document.createElement('a');
      a.href = url;
      a.download = path.split('/').pop() || 'file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return url;
    } catch (error) {
      console.error('Download failed:', error);
      return null;
    }
  }, []);

  const uploadTextFile = useCallback(async (path: string, content: string) => {
    const storageRef = ref(STORAGE, path);
    try {
      await uploadString(storageRef, content, 'raw');
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier texte:", error);
      throw new Error("Erreur lors de l'upload du fichier texte");
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({ uploadFile, downloadFile, uploadTextFile }),
    [uploadFile, downloadFile, uploadTextFile]
  );

  return (
    <FirebaseStorageContext.Provider value={memoizedValue}>
      {children}
    </FirebaseStorageContext.Provider>
  );
};
