import { Box, Card, Stack, ListItemText } from '@mui/material';

import { getCorrectionType } from 'src/utils/utils';

import Iconify from 'src/components/iconify';
import { useServiceState } from 'src/providers/service/service-provider';

type Props = {};

// ----------------------------------------------------------------------

// eslint-disable-next-line no-empty-pattern
export default function ServiceStepSummary({}: Props) {
  const { state: service, getTotalDays, getDeliveryDate } = useServiceState();

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Titre',
          value: service.title,
          icon: <Iconify icon="solar:bolt-bold" />,
        },
        {
          label: 'Type de correction',
          value: getCorrectionType(service.optionType),
          icon: <Iconify icon="solar:checklist-minimalistic-bold" />,
        },
        {
          label: 'Durée de la commande',
          value: `${getTotalDays()} jours`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Livraison avant le',
          value: `${getDeliveryDate()}`,
          icon: <Iconify icon="solar:delivery-bold" />,
        },
        {
          label: 'Prix',
          value: `${service.price} €`,
          icon: <Iconify icon="solar:dollar-minimalistic-bold" />,
        },
        {
          label: 'Nombre de mots',
          value: `${service.wordsValue}`,
          icon: <Iconify icon="solar:clapperboard-text-bold" />,
        },
        {
          label: 'Fichier',
          value: `${service.uploadedFile.name}`,
          icon: <Iconify icon="solar:file-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  return <Box>{renderOverview}</Box>;
}
