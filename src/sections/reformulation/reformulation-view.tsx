'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { ReformulationTextService } from 'src/services/reformulation.service';
import { ReformulationStorageService } from 'src/services/reformulation-storage.service';

import Iconify from 'src/components/iconify';
import EmojiSlider, {
  getEmojiForDegree,
  getLabelForDegree,
} from 'src/components/reformulation/emoji-slider';

import type { HistoryEntry } from 'src/types/reformulation';

// ----------------------------------------------------------------------

export default function ReformulationView() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [versions, setVersions] = useState(1);
  const [reformulationDegree, setReformulationDegree] = useState(2);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [usedReformulationDegree, setUsedReformulationDegree] = useState(2);
  const textService = new ReformulationTextService();

  // Charger l'historique au démarrage
  useEffect(() => {
    const savedHistory = ReformulationStorageService.loadHistory();
    setHistory(savedHistory);
  }, []);

  // Sauvegarder l'historique à chaque modification
  useEffect(() => {
    ReformulationStorageService.saveHistory(history);
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);
    setCurrentVersion(0);
    setUsedReformulationDegree(reformulationDegree);

    try {
      const newResults: string[] = [];

      // Générer les versions séquentiellement pour éviter les collisions
      for (let i = 1; i <= versions; i += 1) {
        setCurrentVersion(i);
        // eslint-disable-next-line no-await-in-loop
        const result = await textService.rephraseSentence(
          inputText,
          newResults,
          reformulationDegree
        );

        if (!result) {
          throw new Error('Erreur lors de la reformulation');
        }

        newResults.push(result);
        setResults((prev) => [...prev, result]);

        if (i < versions) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            setTimeout(resolve, 300);
          });
        }
      }

      // Ajouter à l'historique
      setHistory((prev) => [
        {
          input: inputText,
          versions: newResults,
          timestamp: Date.now(),
          reformulationDegree,
        },
        ...prev.slice(0, 9), // Garder seulement les 10 derniers
      ]);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await ReformulationTextService.copyToClipboard(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await ReformulationTextService.readFromClipboard();
      if (text) setInputText(text);
    } catch (error) {
      console.error('Erreur lors de la lecture du presse-papiers:', error);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResults([]);
    setCurrentVersion(0);
  };

  const handleReuseText = (text: string) => {
    setInputText(text);
    setResults([]);
    setCurrentVersion(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Outil de Reformulation
      </Typography>

      <Card sx={{ p: 4, mb: 4, maxWidth: 800, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Texte à reformuler
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Entrez votre texte ici..."
              InputProps={{
                endAdornment: (
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {inputText && (
                      <IconButton onClick={handleClear} size="small">
                        <Iconify icon="solar:close-circle-bold" />
                      </IconButton>
                    )}
                    <IconButton onClick={handlePaste} size="small">
                      <Iconify icon="solar:clipboard-bold" />
                    </IconButton>
                  </Stack>
                ),
              }}
            />
          </Box>

          <EmojiSlider value={reformulationDegree} onChange={setReformulationDegree} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
              Nombre de versions: {versions}
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={versions}
                min={1}
                max={5}
                step={1}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                ]}
                onChange={(_, newValue) => setVersions(newValue as number)}
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
                    top: 20,
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    fontWeight: 600,
                    '&.MuiSlider-markLabelActive': {
                      color: 'text.primary',
                    },
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mt: 2,
                fontStyle: 'italic',
              }}
            >
              {versions === 1 && 'Une seule version sera générée'}
              {versions === 2 && 'Deux alternatives vous seront proposées'}
              {versions === 3 && 'Trois options différentes à votre disposition'}
              {versions === 4 && 'Quatre variantes pour plus de choix'}
              {versions === 5 && 'Cinq reformulations pour une richesse maximale'}
            </Typography>
          </Box>

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!inputText.trim()}
            loadingIndicator={
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={16} />
                {currentVersion > 0 && (
                  <Typography variant="body2">
                    Version {currentVersion}/{versions}
                  </Typography>
                )}
              </Stack>
            }
          >
            Reformuler
          </LoadingButton>
        </Box>

        {results.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Résultats
            </Typography>
            <Stack spacing={2}>
              {results.map((result, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': { bgcolor: 'action.hover' },
                    position: 'relative',
                  }}
                  onClick={() => handleCopy(result, index)}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Chip label={`Version ${index + 1}`} color="primary" size="small" />
                    <Chip
                      icon={<span>{getEmojiForDegree(usedReformulationDegree)}</span>}
                      label={getLabelForDegree(usedReformulationDegree)}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="body1">{result}</Typography>
                  {copiedIndex === index && (
                    <Chip
                      label="Copié !"
                      color="success"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                    />
                  )}
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Card>

      {/* Historique */}
      {history.length > 0 && (
        <Card sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <Iconify icon="solar:history-bold" sx={{ mr: 1 }} />
            Historique
          </Typography>
          <Stack spacing={3}>
            {history.map((entry, historyIndex) => (
              <Card key={entry.timestamp} sx={{ p: 3, bgcolor: 'grey.50' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {ReformulationStorageService.formatDate(entry.timestamp)}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => handleReuseText(entry.input)}
                    startIcon={<Iconify icon="solar:restart-bold" />}
                  >
                    Réutiliser
                  </Button>
                </Stack>

                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Texte original
                  </Typography>
                  <Typography variant="body2">{entry.input}</Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Versions reformulées
                </Typography>
                <Stack spacing={1}>
                  {entry.versions.map((version, versionIndex) => (
                    <Box
                      key={versionIndex}
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: 1,
                        borderColor: 'divider',
                        '&:hover': { bgcolor: 'action.hover' },
                        position: 'relative',
                      }}
                      onClick={() => handleCopy(version, historyIndex * 100 + versionIndex)}
                    >
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip
                          label={`Version ${versionIndex + 1}`}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                      <Typography variant="body2">{version}</Typography>
                      {copiedIndex === historyIndex * 100 + versionIndex && (
                        <Chip
                          label="Copié !"
                          color="success"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
              </Card>
            ))}
          </Stack>
        </Card>
      )}
    </Box>
  );
}
