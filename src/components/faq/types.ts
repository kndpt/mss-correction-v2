import { ReactNode } from 'react';

export interface FAQItem {
  id: string;
  heading: string;
  detail: ReactNode;
}

export interface FAQProps {
  title?: string;
  description?: string;
  items: (string | FAQItem)[];
}
