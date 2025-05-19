'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Chip, Paper, TextField } from '@mui/material';

import { paths } from 'src/routes/paths';

import { typeOptions } from 'src/utils/local-data';

import useIsAdmin from 'src/auth/hooks/use-is-admin';
import { useFirestoreFreeSample } from 'src/firestore/hooks/useFirestoreFreeSample';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import LoadingComponent from 'src/components/loading/LoadingComponent';

// ----------------------------------------------------------------------

export default function FreeSampleDetailsView() {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const { sample, loading, error, updateSample } = useFirestoreFreeSample();

  const [isEditing, setIsEditing] = useState(false);
  const [correctedText, setCorrectedText] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form fields when sample data loads
  useEffect(() => {
    if (sample) {
      setCorrectedText(sample.correctedText || '');
      setNotes(sample.notes || '');
    }
  }, [sample]);

  const handleSubmitCorrection = async () => {
    setIsSaving(true);

    try {
      await updateSample({
        correctedText,
        notes,
        status: 'completed',
      });

      enqueueSnackbar('Correction enregistrée avec succès', { variant: 'success' });
      setIsEditing(false);
    } catch (err) {
      enqueueSnackbar('Erreur lors de l&apos;enregistrement de la correction', {
        variant: 'error',
      });
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToList = () => {
    if (isAdmin) {
      router.push(paths.dashboard.order.root);
    } else {
      router.push('/');
    }
  };

  const formatDate = (dateValue: any): string => {
    if (!dateValue) return '-';

    // Handle Firestore timestamp
    if (dateValue && typeof dateValue.toDate === 'function') {
      return new Date(dateValue.toDate()).toLocaleDateString('fr-FR');
    }

    // Handle JavaScript Date
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString('fr-FR');
    }

    // Handle string date
    if (typeof dateValue === 'string') {
      return dateValue;
    }

    return '-';
  };

  if (loading) return <LoadingComponent />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!sample) return <EmptyContent title="Échantillon non trouvé" />;

  const getCorrectionTypeName = (typeId: string) => {
    const foundOption = typeOptions.find((option) => option.id === typeId);
    return foundOption?.name || typeId;
  };

  // Determine what to display in the main content area
  const renderMainContent = () => {
    if (isAdmin && isEditing) {
      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Texte corrigé
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={10}
            value={correctedText}
            onChange={(e) => setCorrectedText(e.target.value)}
            placeholder="Entrez ici le texte corrigé..."
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Notes et explications (optionnel)
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ajoutez des explications sur vos corrections..."
            sx={{ mb: 3 }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Annuler
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmitCorrection}
              disabled={!correctedText.trim() || isSaving}
              startIcon={<Iconify icon="eva:save-fill" />}
            >
              Enregistrer la correction
            </Button>
          </Stack>
        </Paper>
      );
    }

    if (sample.status === 'completed' && sample.correctedText) {
      return (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Texte corrigé
          </Typography>

          <Typography
            variant="body2"
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              whiteSpace: 'pre-wrap',
              mb: sample.notes ? 3 : 0,
            }}
          >
            {sample.correctedText}
          </Typography>

          {sample.notes && (
            <>
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                Notes et explications
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.neutral',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {sample.notes}
              </Typography>
            </>
          )}
        </Paper>
      );
    }

    // Default - pending state
    return (
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <Iconify
          icon="solar:document-text-bold"
          width={60}
          height={60}
          sx={{ color: 'text.disabled', mb: 2 }}
        />

        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          La correction est en attente...
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center', mt: 1 }}>
          Vous recevrez un email dès que votre extrait aura été corrigé.
        </Typography>
      </Paper>
    );
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4">Correction d&apos;extrait gratuit</Typography>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          onClick={handleBackToList}
        >
          Retour
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Informations
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Email
                  </Typography>
                  <Typography variant="subtitle2">{sample.email}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Date
                  </Typography>
                  <Typography variant="subtitle2">{formatDate(sample.createdAt)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Type de correction
                  </Typography>
                  <Chip
                    label={getCorrectionTypeName(sample.correctionType)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Statut
                  </Typography>
                  <Chip
                    label={sample.status === 'completed' ? 'Terminé' : 'En attente'}
                    size="small"
                    color={sample.status === 'completed' ? 'success' : 'warning'}
                  />
                </Stack>

                <Divider />

                {isAdmin && sample.status === 'pending' && !isEditing && (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    startIcon={<Iconify icon="solar:pen-bold" />}
                  >
                    Corriger cet extrait
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Texte original
            </Typography>
            <Typography
              variant="body2"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.neutral',
                whiteSpace: 'pre-wrap',
              }}
            >
              {sample.text}
            </Typography>
          </Paper>

          {renderMainContent()}
        </Grid>
      </Grid>
    </Container>
  );
}
