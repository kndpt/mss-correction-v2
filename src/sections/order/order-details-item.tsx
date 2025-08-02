import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { getOrderType, getOrderDuration } from 'src/utils/order';

import Iconify from 'src/components/iconify';

import { IOrder } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
  handleDownloadFile: (path: string) => Promise<void>;
  isMobile?: boolean;
};

export default function OrderDetailsItems({ order, handleDownloadFile, isMobile = false }: Props) {
  const isCompleted = order.status === 'done';
  const hasFixedFile = Boolean(order.fixedFilePath);

  // Contenu des informations
  const infoContent = (
    <Stack spacing={3}>
      {/* Order Details */}
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Détails de la commande
        </Typography>
        <Stack spacing={1.5} sx={{ typography: 'body2' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="text.secondary" fontSize="0.875rem">
              Type de correction
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', textAlign: 'right' }}>
              {getOrderType(order.service.optionType)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="text.secondary" fontSize="0.875rem">
              Nombre de mots
            </Typography>
            <Typography sx={{ fontWeight: 500 }} fontSize="0.875rem">
              {order.service.wordsValue.toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="text.secondary" fontSize="0.875rem">
              Délai
            </Typography>
            <Typography sx={{ fontWeight: 500 }} fontSize="0.875rem">
              {getOrderDuration(order.service)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Files Section */}
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Fichiers
        </Typography>

        {/* Original File */}
        <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: 'primary.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="solar:upload-outline" width={20} color="primary.main" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Fichier original
              </Typography>
              <Link
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => handleDownloadFile(order.filePath)}
              >
                {order.service.uploadedFile.name}
              </Link>
            </Box>
          </Stack>
        </Card>

        {/* Corrected File */}
        <Card
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: isCompleted && hasFixedFile ? 'primary.lighter' : 'grey.100',
            borderColor: isCompleted && hasFixedFile ? 'primary.main' : 'grey.300',
            borderWidth: isCompleted && hasFixedFile ? 2 : 1,
            opacity: isCompleted && hasFixedFile ? 1 : 0.7,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: isCompleted && hasFixedFile ? 'primary.main' : 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon={
                  isCompleted && hasFixedFile ? 'solar:download-bold' : 'solar:clock-circle-outline'
                }
                width={20}
                color={isCompleted && hasFixedFile ? 'common.white' : 'grey.600'}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Fichier corrigé
              </Typography>
              {isCompleted && hasFixedFile ? (
                <Link
                  variant="body2"
                  color="primary.main"
                  sx={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                  onClick={() => handleDownloadFile(order.fixedFilePath!)}
                >
                  Télécharger le fichier corrigé
                </Link>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  En cours de correction...
                </Typography>
              )}
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );

  if (isMobile) {
    // Version mobile : pas d'accordion, contenu directement affiché
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Informations
        </Typography>
        {infoContent}
      </Card>
    );
  }

  // Version desktop : avec accordion comme avant
  return (
    <Card>
      <Accordion key={order.id} sx={{ p: 1 }}>
        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
          <Typography variant="subtitle1">Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>{infoContent}</AccordionDetails>
      </Accordion>
    </Card>
  );
}
