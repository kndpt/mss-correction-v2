import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionLivreView from 'src/sections/correction-livre/view';

export default async function CorrectionRomanPage() {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Correction de Livre",
        "image": "https://msscorrection.fr/assets/product-correction-texte.webp",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.6",
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
      <CorrectionLivreView />
    </Box>
  );
}
