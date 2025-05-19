export interface FreeSamplesContextType {
  submitFreeSample: (
    text: string,
    email: string,
    correctionType?: string,
    source?: string
  ) => Promise<{ success: boolean; error?: Error }>;
  loading: boolean;
  error: Error | null;
}
