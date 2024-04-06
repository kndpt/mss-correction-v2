import Script from 'next/script';

import MainLayout from 'src/layouts/main';

import TarifsView from 'src/sections/tarifs/tarifs-view';

/*
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
        "ratingValue": "4.4",
        "reviewCount": "12"
      },
      */

// ----------------------------------------------------------------------

export default function TarifsPage() {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
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
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-01"
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
          "ratingValue": "4.4",
          "reviewCount": "12"
        }
      } 
  `,
    };
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={addProductJsonLd()}
        key="product-jsonld"
      />
      <MainLayout hasFooter={false}>
        <TarifsView />
      </MainLayout>
    </>
  );
}
