import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionEntrepriseView from 'src/sections/correction-entreprise-freelance/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Services Professionnels de Correction de Texte pour Entreprises - Mss Correction',
  description: `Découvrez mes services de correction de texte haut de gamme, spécialement conçus pour les besoins des entreprises. Précision, qualité et confidentialité garanties.`,
};

export default function CorrectionEntreprisePage() {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Correction et relecture freelance",
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
      <CorrectionEntrepriseView />;
    </Box>
  );
}
