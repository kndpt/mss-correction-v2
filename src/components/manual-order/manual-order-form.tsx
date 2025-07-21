'use client';

import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Box,
  Card,
  Alert,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  AlertTitle,
  CardHeader,
  CardContent,
} from '@mui/material';

import { useFirebaseStorage } from 'src/storage/hooks/useFirebaseStorage';

import { useSnackbar } from 'src/components/snackbar';
import SimulatorTypeCorrection from 'src/components/simulator/simulator-type-correction';
import SimulatorTimeCounter from 'src/components/simulator/simulator-time-counter/simulator-time-counter';

import { IManualOrderForm } from 'src/types/manual-order';
import { IOptionType, IOptionDuration } from 'src/types/order';

import {
  createManualOrder,
  validateManualOrder,
  calculateManualOrder,
} from '../../firestore/providers/manual-order/manual-order-provider';

// ----------------------------------------------------------------------

interface Props {
  onSuccess?: (orderId: string) => void;
  onCancel?: () => void;
}

const defaultValues: IManualOrderForm = {
  firstName: '',
  lastName: '',
  email: '',
  wordsValue: 500,
  optionDuration: {
    twenty_four_hours: false,
    two_days: false,
    three_days: true,
    one_week: false,
    two_weeks: false,
    three_weeks: false,
  },
  optionType: {
    proofreading_and_correction: true,
    beautification: false,
  },
  title: '',
  informations: '',
};

export default function ManualOrderForm({ onSuccess, onCancel }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ReturnType<typeof validateManualOrder> | null>(null);

  const { enqueueSnackbar } = useSnackbar();
  const firebaseStorage = useFirebaseStorage();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IManualOrderForm>({
    defaultValues,
  });

  const watchedForm = watch();

  // Calcul automatique du prix et des jours
  const calculation = calculateManualOrder(watchedForm);

  const handleValidation = useCallback(() => {
    const result = validateManualOrder(watchedForm);
    setValidation(result);
    return result;
  }, [watchedForm]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  }, []);

  const handleDurationChange = useCallback(
    (option: keyof IOptionDuration) => {
      const resetState: IOptionDuration = Object.keys(watchedForm.optionDuration).reduce(
        (acc, key) => {
          acc[key as keyof IOptionDuration] = false;
          return acc;
        },
        {} as IOptionDuration
      );

      setValue('optionDuration', { ...resetState, [option]: true });
    },
    [setValue, watchedForm.optionDuration]
  );

  const handleTypeChange = useCallback(
    (option: keyof IOptionType) => {
      const resetState: IOptionType = Object.keys(watchedForm.optionType).reduce((acc, key) => {
        acc[key as keyof IOptionType] = false;
        return acc;
      }, {} as IOptionType);

      setValue('optionType', { ...resetState, [option]: true });
    },
    [setValue, watchedForm.optionType]
  );

  const onSubmit = useCallback(
    async (data: IManualOrderForm) => {
      setIsLoading(true);
      try {
        // Validation
        const validationResult = handleValidation();
        if (!validationResult.isValid) {
          enqueueSnackbar(`Erreurs de validation: ${validationResult.errors.join(', ')}`, {
            variant: 'error',
          });
          setIsLoading(false);
          return;
        }

        // Upload du fichier si présent
        let filePath: string | undefined;
        if (uploadedFile) {
          // Utiliser un dossier admin pour éviter les problèmes de permissions
          filePath = `admin/manual-orders/${Date.now()}_${data.email.replace('@', '_at_')}_${
            uploadedFile.name
          }`;
          await firebaseStorage.uploadFile(filePath, uploadedFile);
        }

        // Création de la commande
        const orderId = await createManualOrder(data, filePath);

        enqueueSnackbar('Commande manuelle créée avec succès !', {
          variant: 'success',
        });

        onSuccess?.(orderId);
      } catch (error) {
        console.error('Erreur lors de la création:', error);
        enqueueSnackbar(
          error instanceof Error ? error.message : 'Erreur lors de la création de la commande',
          { variant: 'error' }
        );
      } finally {
        setIsLoading(false);
      }
    },
    [handleValidation, uploadedFile, firebaseStorage, onSuccess, enqueueSnackbar]
  );

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto' }}>
      <CardHeader title="Créer une commande manuelle" />

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Informations client */}
            <Typography variant="h6">Informations client</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'Le prénom est requis' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Prénom"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Le nom est requis' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nom"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "L'email est requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email invalide',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Divider />

            {/* Informations service */}
            <Typography variant="h6">Informations service</Typography>

            <Controller
              name="title"
              control={control}
              rules={{ required: 'Le titre est requis' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Titre du document"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                />
              )}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Controller
                name="wordsValue"
                control={control}
                rules={{
                  required: 'Le nombre de mots est requis',
                  min: { value: 500, message: 'Minimum 500 mots' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre de mots"
                    type="number"
                    error={!!errors.wordsValue}
                    helperText={errors.wordsValue?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="customPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Prix manuel (€)"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    helperText={field.value ? '' : `Prix auto: ${calculation.price}€`}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="informations"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Informations complémentaires"
                  multiline
                  rows={3}
                  fullWidth
                />
              )}
            />

            {/* Options */}
            <SimulatorTimeCounter
              value={watchedForm.optionDuration}
              handleOptionDurationChange={handleDurationChange}
              getDisability={() => false}
              sx={{ width: '100%' }}
            />

            <SimulatorTypeCorrection
              value={watchedForm.optionType}
              handleOptionTypeChange={handleTypeChange}
              getBeautificationDays={() => calculation.beautificationDays || 0}
            />

            {/* Upload fichier */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Fichier (optionnel)
              </Typography>
              <input type="file" accept=".docx,.doc,.txt" onChange={handleFileUpload} />
              {uploadedFile && (
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  Fichier sélectionné: {uploadedFile.name}
                </Typography>
              )}
            </Box>

            {/* Résumé automatique */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Résumé automatique
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Prix:</strong> {watchedForm.customPrice || calculation.price}€
                  </Typography>
                  <Typography variant="body2">
                    <strong>Délai total:</strong> {calculation.totalDays} jours
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date de livraison:</strong>{' '}
                    {calculation.deliveryDate.toLocaleDateString('fr-FR')}
                  </Typography>
                  {calculation.beautificationDays && (
                    <Typography variant="body2">
                      <strong>Jours embellissement:</strong> {calculation.beautificationDays}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Validation */}
            {validation && !validation.isValid && (
              <Alert severity="error">
                <AlertTitle>Erreurs de validation</AlertTitle>
                {validation.errors.map((error, index) => (
                  <Typography key={index} variant="body2">
                    • {error}
                  </Typography>
                ))}
              </Alert>
            )}

            {validation && validation.warnings.length > 0 && (
              <Alert severity="warning">
                <AlertTitle>Avertissements</AlertTitle>
                {validation.warnings.map((warning, index) => (
                  <Typography key={index} variant="body2">
                    • {warning}
                  </Typography>
                ))}
              </Alert>
            )}

            {/* Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => {
                  handleValidation();
                }}
              >
                Valider les données
              </Button>

              {onCancel && (
                <Button variant="outlined" onClick={onCancel}>
                  Annuler
                </Button>
              )}

              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Création...' : 'Créer la commande'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
