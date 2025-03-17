import { FirestoreAiDocumentProvider } from 'src/firestore/providers/ai-document/ai-provider';

import AiDocumentDetailsView from 'src/sections/ai-documents/view/ai-document-details-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Détails du document IA corrigé',
};

type Props = {
  params: {
    id: string;
  };
};

export default function AiDocumentDetailsPage({ params }: Props) {
  const { id } = params;

  return (
    <FirestoreAiDocumentProvider id={id}>
      <AiDocumentDetailsView />
    </FirestoreAiDocumentProvider>
  );
}
