import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionRomanView from 'src/sections/correction-roman/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Service de relecture et correction de roman - Mss Correction',
  description: `Professionnelle en correction de roman, Mss Correction offre une relecture précise et un service d'embellissement de texte. Tarifs abordables, simulateur en ligne. Améliorez votre manuscrit avec une experte.`,
};

/*
{
        "@context": "http://schema.org/",
        "@type": "Product",
        "name": "Correction de Roman",
        "image": "https://msscorrection.fr/assets/product-correction-texte.webp",
        "description": "Service professionnel de relecture et correction de roman. Nous offrons une correction détaillée incluant orthographe, grammaire et style pour sublimer votre œuvre littéraire.",
        "sku": "CORR-ROMAN-01",
        "brand": {
          "@type": "Brand",
          "name": "Mss Correction"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://msscorrection.fr/tarifs",
          "priceCurrency": "EUR",
          "price": "0.006",
          "validFrom": "2023-01-01",
          "validThrough": "2023-12-31",
          "availability": "http://schema.org/InStock",
          "priceValidUntil": "2023-12-01"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.4",
          "reviewCount": "12"
        }
      } */

export default function CorrectionRomanPage() {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Correction de Roman",
        "image": "https://msscorrection.fr/assets/product-correction-texte.webp",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.4",
          "reviewCount": "12"
        }
      } 
  `,
    };
  }

  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={addProductJsonLd()}
        key="product-jsonld"
      />
      <CorrectionRomanView />;
    </Box>
  );
}
