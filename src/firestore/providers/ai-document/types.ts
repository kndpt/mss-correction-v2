import { IAiDocument } from 'src/types/ai-document';

export type AiDocumentContextType = {
  document: IAiDocument | null;
  loading: boolean;
  error: any;
};
