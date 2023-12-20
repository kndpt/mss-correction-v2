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
};

export default function OrderDetailsItems({ order, handleDownloadFile }: Props) {
  return (
    <Card>
      <Accordion key={order.id} sx={{ p: 1 }}>
        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
          <Typography variant="subtitle1">Informations</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={1.5} sx={{ typography: 'body2' }}>
            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ color: 'text.secondary', width: 160, flexShrink: 0 }}>
                Type de correction
              </Box>
              {getOrderType(order.service.optionType)}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ color: 'text.secondary', width: 160, flexShrink: 0 }}>
                Nombre de mots
              </Box>
              {order.service.wordsValue.toString()}
            </Stack>

            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ color: 'text.secondary', width: 160, flexShrink: 0 }}>
                Temps de correction
              </Box>
              {getOrderDuration(order.service.optionDuration)}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ color: 'text.secondary', width: 160, flexShrink: 0 }}>
                Fichier
              </Box>
              <Link
                underline="always"
                color="inherit"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDownloadFile(order.filePath)}
              >
                {order.service.uploadedFile.name}
              </Link>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
