import { Box, Card, Stack, ListItemText } from '@mui/material';

import { useServiceState } from 'src/providers/service/service-provider';

import Iconify from 'src/components/iconify';

type Props = {};

// ----------------------------------------------------------------------

// eslint-disable-next-line no-empty-pattern
export default function ServiceStepSummary({}: Props) {
  const { state: service } = useServiceState();

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Titre',
          value: 'Lettre de motivation',
          icon: <Iconify icon="solar:bolt-bold" />,
        },
        {
          label: 'Type de correction',
          value: 'Correction et embellissement',
          icon: <Iconify icon="solar:checklist-minimalistic-bold" />,
        },
        {
          label: 'Durée de la commande',
          value: `48 heures - Possibilité de livraison en 24h`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Prix',
          value: `15 €`,
          icon: <Iconify icon="solar:dollar-minimalistic-bold" />,
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
