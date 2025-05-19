import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { Box, Chip, Alert, Tooltip, Typography, InputAdornment } from '@mui/material';

import { typeOptions } from 'src/utils/local-data';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const MAX_WORDS = 500;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface Props extends Omit<DialogProps, 'onSubmit'> {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (text: string, email: string, correctionType: string) => Promise<void>;
}

export default function FreeSampleCorrectionDialog({ open, onClose, onSubmit, ...other }: Props) {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [correctionType, setCorrectionType] = useState('proofreading_and_correction');

  const countWords = useCallback((textContent: string) => {
    const words = textContent.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, []);

  useEffect(() => {
    setWordCount(countWords(text));
  }, [text, countWords]);

  useEffect(() => {
    if (email) {
      setIsEmailValid(EMAIL_REGEX.test(email));
    } else {
      setIsEmailValid(true);
      setShowEmailError(false);
    }
  }, [email]);

  const handleEmailBlur = () => {
    if (email) {
      setShowEmailError(!isEmailValid);
    }
  };

  const handleCorrectionTypeChange = (typeId: string) => {
    setCorrectionType(typeId);
  };

  const handleSubmit = async () => {
    if (!text.trim() || !email.trim()) return;
    if (!isEmailValid || wordCount > MAX_WORDS) return;

    setIsSubmitting(true);
    try {
      await onSubmit(text, email, correctionType);
      onClose();
      setText('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting free sample:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = text.trim() && email.trim() && isEmailValid && wordCount <= MAX_WORDS;

  const getTooltipContent = (): React.JSX.Element => (
    <div className="w-80">
      <Typography color="white" className="font-medium">
        En quoi consiste cette option ?
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Révision de la ponctuation
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Suppression des répétitions
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Changement de certains mots en mots plus jolis à l&apos;écrit
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Reformulation des phrases pas claires
      </Typography>
    </div>
  );

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        Testez gratuitement ma correction
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3, pb: 0 }}>
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Envoyez-moi un extrait de votre roman et recevez gratuitement une correction
              professionnelle. C&apos;est une occasion unique de découvrir ma façon de travailler,
              100% manuelle et personnalisée.
            </Typography>
          </Alert>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Je corrigerai personnellement votre extrait pour vous montrer la qualité et la précision
            de mon travail — aucun logiciel automatisé ou IA n&apos;interviendra dans ce processus.
            Vous recevrez le résultat directement par email.
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Quel type de correction souhaitez-vous ?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(2, 1fr)', xs: '1fr' },
            gap: 2,
            mb: 3,
          }}
        >
          {typeOptions.map((option, i) => (
            <Tooltip title={i === 1 ? getTooltipContent() : ''} key={i}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                gap={0.5}
              >
                {correctionType === option.id ? (
                  <Chip
                    variant="filled"
                    key={option.id}
                    clickable
                    label={option.name}
                    icon={<Iconify width={16} icon={option.icon} />}
                    onClick={() => handleCorrectionTypeChange(option.id)}
                    deleteIcon={<Iconify width={18} icon="eva:checkmark-fill" />}
                    sx={{ width: '100%' }}
                  />
                ) : (
                  <Chip
                    variant="outlined"
                    key={option.id}
                    clickable
                    label={option.name}
                    onClick={() => handleCorrectionTypeChange(option.id)}
                    icon={<Iconify width={16} icon={option.icon} />}
                    sx={{ width: '100%' }}
                  />
                )}
                {i === 1 ? (
                  <Typography variant="caption">Option avancée</Typography>
                ) : (
                  <Typography variant="caption">Par défaut</Typography>
                )}
              </Box>
            </Tooltip>
          ))}
        </Box>

        <TextField
          fullWidth
          label="Votre extrait (maximum 500 mots)"
          multiline
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Collez ici un extrait de votre roman..."
          required
          sx={{ mb: 1 }}
          error={wordCount > MAX_WORDS}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
              mr: 0,
              color: wordCount > MAX_WORDS ? 'error.main' : 'text.secondary',
            },
          }}
          helperText={`${wordCount}/${MAX_WORDS} mots`}
        />

        {wordCount > MAX_WORDS && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 2 }}>
            Votre extrait dépasse la limite de {MAX_WORDS} mots. Merci de réduire sa longueur.
          </Typography>
        )}

        <TextField
          fullWidth
          label="Votre email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder="email@exemple.com"
          required
          sx={{ mb: 2 }}
          error={showEmailError}
          helperText={showEmailError ? 'Veuillez entrer une adresse email valide' : ''}
          InputProps={{
            endAdornment:
              isEmailValid && email ? (
                <InputAdornment position="end">
                  <Iconify
                    icon="eva:checkmark-circle-2-fill"
                    sx={{ color: 'success.main', width: 20, height: 20 }}
                  />
                </InputAdornment>
              ) : null,
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Annuler
        </Button>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:paper-plane-fill" />}
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          Envoyer mon extrait
        </Button>
      </DialogActions>
    </Dialog>
  );
}
