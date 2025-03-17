export interface IAiDocument {
  document_name: string;
  real?: IAiDocumentCorrection[];
  hallucination?: IAiDocumentCorrection[];
  total_cost?: number;
  cost_input?: number;
  cost_completion?: number;
}

export interface IAiDocumentCorrection {
  correction: string;
  mistake: string;
}
