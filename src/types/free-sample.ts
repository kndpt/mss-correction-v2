export interface IFreeSample {
  id?: string;
  text: string;
  email: string;
  createdAt: any; // Firebase Timestamp
  status: 'pending' | 'completed';
  source: string;
  correctionType: string;
  correctedText?: string;
  corrections?: IFreeSampleCorrection[];
  notes?: string;
}

export interface IFreeSampleCorrection {
  original: string;
  corrected: string;
  explanation?: string;
}
