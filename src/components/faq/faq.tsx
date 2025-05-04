import { m } from 'framer-motion';
import { track } from '@vutolabs/analytics';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FAQ_ITEMS } from './faq-items';
import { FAQItem, FAQProps } from './types';

export default function FAQ({
  title = 'Questions fréquentes',
  description = "Ce service de correction offre la tranquillité d'esprit, sachant que les aspects linguistiques de votre œuvre sont entre des mains expertes.",
  items,
}: FAQProps) {
  // Process items to handle both string IDs and direct FAQItem objects
  const faqItems = items.map((item): FAQItem => {
    if (typeof item === 'string') {
      const faqItem = FAQ_ITEMS[item];
      if (!faqItem) {
        console.warn(`FAQ item with ID "${item}" not found.`);
      }
      return faqItem || { id: 'not-found', heading: 'Item not found', detail: null };
    }
    return item;
  });

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">{title}</Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography sx={{ color: 'text.secondary', pb: 12, pt: 4 }}>{description}</Typography>
          </m.div>
          <div>
            {faqItems.map((accordion, i) => (
              <Accordion
                key={`${accordion.id}-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  track('faq_accordion_clicked', {
                    heading: accordion.id,
                    detail: accordion.heading,
                  });
                }}
              >
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1">{accordion.heading}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ textAlign: 'start' }}>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Box>
      </m.div>
    </Container>
  );
}
