import Script from 'next/script';

import Box from '@mui/material/Box';

import CorrectionLettreMotivationView from 'src/sections/correction-lettre-motivation/view';

export default function CorrectionLettreMotivationPage() {
  /*
    "offers": {
          "@type": "Offer",
          "url": "https://msscorrection.fr/tarifs",
          "priceCurrency": "EUR",
          "price": "0.006",
          "validFrom": "2023-01-01",
          "validThrough": "2023-12-31",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2023-12-01"
        },
        "review": [{
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Hugo"
          },
          "datePublished": "2023-12-07",
          "reviewBody": "Merci à Océane pour la correction de mon roman. Elle a fait un embellissement sur tout le contenu et son travail est irréprochable. Client régulier et toujours satisfait"
        }],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "13"
        }

   */
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
          "priceValidUntil": "2025-12-01",
          "availability": "https://schema.org/OnlineOnly"
        },
        "review": [{
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Célia",
            "name": "Hugo"
          },
          "datePublished": "2023-25-07",
          "reviewBody": "Une expérience très qualificative ! Elle est efficace et bienveillante. Elle a pris le temps de me montrer les fautes et de m’expliquer en étant sûre que j’ai tout assimilé. Un retour très satisfaisant et efficace qui m’a permis de prendre confiance en mes capacités et de ne plus reproduire les mêmes erreurs. Encore merci, je recommande vivement"
        }],
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
      <CorrectionLettreMotivationView />
    </Box>
  );
}
