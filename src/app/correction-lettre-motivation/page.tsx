import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionLettreMotivationView from 'src/sections/correction-lettre-motivation/view';

export default function CorrectionLettreMotivationPage() {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "Correction de lettre de motivation",
        "image": "https://msscorrection.fr/assets/images/home/thumbnail.webp",
        "description": "Boostez l'impact de votre lettre de motivation avec une correction et un embellissement. Mettez toutes les chances de votre côté pour séduire les recruteurs.",
        "brand": {
          "@type": "Brand",
          "name": "Mss Correction"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://msscorrection.fr/correction-lettre-motivation/",
          "priceCurrency": "EUR",
          "price": "15",
          "availability": "https://schema.org/OnlineOnly"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.4",
          "bestRating": "5",
          "worstRating": "4",
          "ratingCount": "12"
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
      <CorrectionLettreMotivationView />
    </Box>
  );
}
