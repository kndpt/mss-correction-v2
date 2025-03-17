'use client';

import React from 'react';

import { Paper, Container } from '@mui/material';

import { useFirestoreAiDocument } from 'src/firestore/hooks/useFirestoreAiDocument';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';

import { DocumentTabs, DocumentHeader, CorrectionTabContent } from './components';

// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const { document, loading, error } = useFirestoreAiDocument();
  const [tabValue, setTabValue] = React.useState(0);
  const settings = useSettingsContext();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;
  if (!document) return <EmptyContent title="Document introuvable" />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <DocumentHeader documentName={document.document_name} totalCost={document.total_cost ?? 0} />

      <Paper sx={{ width: '100%', mb: 4 }}>
        <DocumentTabs
          tabValue={tabValue}
          realCount={document.real?.length}
          hallucinationCount={document.hallucination?.length}
          handleTabChange={handleTabChange}
        >
          {tabValue === 0 && (
            <CorrectionTabContent
              corrections={document.real}
              emptyMessage="Aucune correction à afficher"
              title={`${document.real?.length} corrections trouvées`}
              subtitle="Cliquez sur l'icône de copie pour copier la faute dans votre presse-papier"
            />
          )}

          {tabValue === 1 && (
            <CorrectionTabContent
              corrections={document.hallucination}
              emptyMessage="Aucun faux positif détecté"
              title={`${document.hallucination?.length} faux positifs identifiés`}
              subtitle="Ces corrections ont été identifiées comme non pertinentes"
            />
          )}
        </DocumentTabs>
      </Paper>
    </Container>
  );
}
