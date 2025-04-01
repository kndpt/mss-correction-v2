import Script from 'next/script';

import Box from '@mui/material/Box';

import { fetchGoogleReviews } from 'src/api/google-review.api';

import CorrectionRomanView from 'src/sections/correction-roman/view';

export default async function CorrectionRomanPage() {
  const { reviews, user_ratings_total, rating } = await fetchGoogleReviews();

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Correction de Roman",
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
      <CorrectionRomanView
        reviews={reviews}
        user_ratings_total={user_ratings_total}
        rating={rating}
      />
    </Box>
  );
}

export const revalidate = 3600;
