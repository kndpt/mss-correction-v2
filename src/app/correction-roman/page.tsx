import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionRomanView from 'src/sections/correction-roman/view';

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
          "ratingValue": "4.5",
          "reviewCount": "13"
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
          "ratingValue": "4.5",
          "reviewCount": "13"
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
      <CorrectionRomanView />
    </Box>
  );
}
