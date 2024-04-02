import { useState } from 'react';

import { Box } from '@mui/material';

import Image from 'src/components/image';

import ServiceStepText from './service-step-text';
import { useServiceDispatch } from '../providers/service-provider';
import ServiceStepUploadDocument from './service-step-upload-document';
import ServiceLettreMotivationType from '../components/service-lettre-motivation-type';

enum LettreMotivationType {
  DOCUMENT = 'document',
  TEXT = 'text',
}

export default function ServiceStepFirst() {
  const dispatch = useServiceDispatch();
  const [lettreMotivationType, setLettreMotivationType] = useState<LettreMotivationType | null>(
    null
  );

  const handleSelectType = (type: LettreMotivationType) => {
    if (type === LettreMotivationType.TEXT) {
      // secure, remove file when switch to text (only if user has uploaded a file before)
      dispatch({
        type: 'setUploadedFile', payload: {
          file: null,
          name: '',
      } });
    } else if (type === LettreMotivationType.DOCUMENT) {
      // secure, remove text when switch to file (only if user has entered text before)
      dispatch({ type: 'setText', payload: '' });
    }

    setLettreMotivationType(type);
  };

  if (!lettreMotivationType) {
    return (
      <Box
        gap={6}
        display="grid"
        sx={{ mt: 2 }}
        gridTemplateColumns={{
          sx: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <ServiceLettreMotivationType
          icon={<Image disabledEffect alt="grid" src="/assets/icons/word.png" />}
          title="Importer un docx"
          onClick={() => handleSelectType(LettreMotivationType.DOCUMENT)}
        />
        <ServiceLettreMotivationType
          icon={<Image disabledEffect alt="grid" src="/assets/icons/note.png" />}
          title="Importer du texte"
          onClick={() => handleSelectType(LettreMotivationType.TEXT)}
        />
      </Box>
    );
  }

  if (lettreMotivationType === LettreMotivationType.TEXT) {
    return <ServiceStepText />;
  }

  return <ServiceStepUploadDocument />;
}
