import JSZip from 'jszip';
import mammoth from 'mammoth';
import { useState, useCallback } from 'react';

import { Typography } from '@mui/material';

import { Upload } from 'src/components/upload';

import { useServiceState, useServiceDispatch } from '../providers/service-provider';

// ----------------------------------------------------------------------

export default function ServiceStepUploadDocument() {
  const dispatch = useServiceDispatch();
  const { state: service } = useServiceState();
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      try {
        if (acceptedFiles.length > 1) {
          throw new Error('You can only upload one file');
        }

        if (acceptedFiles[0].size > 10000000) {
          throw new Error('File is too big');
        }

        const newFile = acceptedFiles[0];
        if (newFile) {
          const fileWithPreview = Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          });
          const fileReader = new FileReader();

          fileReader.onload = async (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            let wordCount = 0;

            if (
              newFile.type ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
              const text = await mammoth.extractRawText({ arrayBuffer });
              wordCount = text.value.split(/\s+/).length;
            } else if (newFile.type === 'application/vnd.oasis.opendocument.text') {
              const zip = new JSZip();
              const content = await zip.loadAsync(arrayBuffer);
              const xmlText = await content.file('content.xml')?.async('text');
              if (xmlText) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
                const text = xmlDoc.documentElement.textContent;
                if (text) wordCount = text.split(/\s+/).length;
              }
            } else if (
              newFile.type ===
              'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ) {
              const zip = new JSZip();
              const content = await zip.loadAsync(arrayBuffer);
              const slideFiles = content.filter((relativePath, _) =>
                relativePath.startsWith('ppt/slides/slide')
              );

              const slideTextsPromises = slideFiles.map(async (slideFile) => {
                const slideContent = await slideFile.async('text');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(slideContent, 'application/xml');
                return xmlDoc.documentElement.textContent;
              });

              const slideTexts = await Promise.all(slideTextsPromises);
              const text = slideTexts.join(' ');

              wordCount = text.split(/\s+/).length;
            }
            dispatch({
              type: 'setWordsValue',
              payload: wordCount,
            });
            setError('');
          };
          fileReader.readAsArrayBuffer(newFile);

          dispatch({
            type: 'setUploadedFile',
            payload: { file: fileWithPreview, name: newFile.name },
          });
        }
      } catch (e) {
        setError("Le fichier n'a pas pu être lu. Il est peut-être corrompu.");
      }
    },
    [dispatch]
  );

  const handleRemoveFile = () => {
    dispatch({
      type: 'setUploadedFile',
      payload: { file: null, name: '' },
    });
  };

  return (
    <>
      <Upload
        disableMultiple
        multiple
        files={service.uploadedFile.file ? [service.uploadedFile.file] : []}
        onDrop={handleDrop}
        onRemove={handleRemoveFile}
      />
      {error && (
        <Typography variant="body2" color="red">
          Error
        </Typography>
      )}
    </>
  );
}
