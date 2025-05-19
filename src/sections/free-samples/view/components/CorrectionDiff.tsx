import { useMemo } from 'react';
import { diffWords } from 'diff';

import { Box } from '@mui/material';

interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

interface CorrectionDiffProps {
  originalText: string;
  correctedText: string;
}

export default function CorrectionDiff({ originalText, correctedText }: CorrectionDiffProps) {
  // Use the diff library to calculate differences between original and corrected text
  // https://www.npmjs.com/package/diff - professional diff implementation
  const diffResult = useMemo<DiffPart[]>(() => {
    if (!originalText || !correctedText) {
      return originalText ? [{ value: originalText, added: false, removed: false }] : [];
    }

    // Use diffWords with options for better text comparison
    return diffWords(originalText, correctedText, {
      ignoreCase: false, // Consider case differences as changes
    });
  }, [originalText, correctedText]);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: 'background.neutral',
        fontFamily: 'serif',
        fontSize: '1rem',
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap',
        overflow: 'auto',
      }}
    >
      {diffResult.map((part, index) => {
        if (!part.added && !part.removed) {
          return <span key={index}>{part.value}</span>;
        }

        if (part.removed) {
          return (
            <span
              key={index}
              style={{
                textDecoration: 'line-through',
                color: '#e53935',
                marginRight: '0.25rem',
                backgroundColor: 'rgba(229, 57, 53, 0.1)',
              }}
            >
              {part.value}
            </span>
          );
        }

        if (part.added) {
          return (
            <span
              key={index}
              style={{
                color: '#2e7d32',
                fontWeight: 500,
                marginLeft: '0.25rem',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
              }}
            >
              {part.value}
            </span>
          );
        }

        return null;
      })}
    </Box>
  );
}
