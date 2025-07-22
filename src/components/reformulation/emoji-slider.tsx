'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import type { ReformulationDegree } from 'src/types/reformulation';

// ----------------------------------------------------------------------

const reformulationDegrees: ReformulationDegree[] = [
  {
    value: 1,
    emoji: '😊',
    label: 'Légère',
    description: 'Reformulation subtile, structure préservée',
  },
  {
    value: 2,
    emoji: '😄',
    label: 'Simple',
    description: 'Reformulation simple, style préservé',
  },
  {
    value: 3,
    emoji: '🤩',
    label: 'Complète',
    description: 'Reformulation complète, structure et vocabulaire changés',
  },
];

export function getEmojiForDegree(degree: number): string {
  const degreeData = reformulationDegrees.find((d) => d.value === degree);
  return degreeData?.emoji ?? '😄';
}

export function getLabelForDegree(degree: number): string {
  const degreeData = reformulationDegrees.find((d) => d.value === degree);
  return degreeData?.label ?? 'Simple';
}

export function getDescriptionForDegree(degree: number): string {
  const degreeData = reformulationDegrees.find((d) => d.value === degree);
  return degreeData?.description ?? 'Reformulation simple, style préservé';
}

// ----------------------------------------------------------------------

interface EmojiSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function EmojiSlider({ value, onChange }: EmojiSliderProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const currentDegree = reformulationDegrees.find((d) => d.value === (hoveredValue || value));

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
        Degré de reformulation
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 1 }}>
          {currentDegree?.emoji}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {currentDegree?.label}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: 280,
            mx: 'auto',
            height: '2.5em', // Hauteur fixe pour 2 lignes
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.25,
          }}
        >
          {currentDegree?.description}
        </Typography>
      </Box>

      <Box sx={{ px: 2 }}>
        <Slider
          value={value}
          min={1}
          max={3}
          step={1}
          marks={reformulationDegrees.map((degree) => ({
            value: degree.value,
            label: degree.emoji,
          }))}
          onChange={(_, newValue) => {
            if (typeof newValue === 'number') {
              onChange(newValue);
            }
          }}
          onChangeCommitted={(_, newValue) => {
            setHoveredValue(null);
            if (typeof newValue === 'number') {
              onChange(newValue);
            }
          }}
          onMouseMove={(event) => {
            const slider = event.currentTarget;
            const rect = slider.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            const newValue = Math.round(1 + percent * 2);
            setHoveredValue(Math.max(1, Math.min(3, newValue)));
          }}
          onMouseLeave={() => setHoveredValue(null)}
          sx={{
            height: 8,
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: '#fff',
              border: '2px solid #000',
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
              },
              '&.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
              },
              '&.Mui-active': {
                boxShadow: '0 0 0 14px rgba(0, 0, 0, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              height: 8,
              backgroundColor: '#000',
              border: 'none',
            },
            '& .MuiSlider-rail': {
              height: 8,
              backgroundColor: '#e0e0e0',
            },
            '& .MuiSlider-mark': {
              width: 2,
              height: 2,
              backgroundColor: '#666',
              '&.MuiSlider-markActive': {
                backgroundColor: '#000',
              },
            },
            '& .MuiSlider-markLabel': {
              top: 28,
              fontSize: '1.2rem',
              color: 'text.secondary',
              '&.MuiSlider-markLabelActive': {
                color: 'text.primary',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
