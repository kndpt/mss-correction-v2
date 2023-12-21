import Script from 'next/script';

import MainLayout from 'src/layouts/main';

import TarifsView from 'src/sections/tarifs/tarifs-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Simulateur de correction - Mss Correction',
};

export default function TarifsPage() {
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Service",
      "serviceType": "Correction et Embellissement de Texte",
      "name": "Luminarédaction - Éclairez Vos Mots, Illuminez Vos Idées",
      "description": "Découvrez Luminarédaction, votre partenaire expert en correction et embellissement de texte. Que ce soit pour des romans, mémoires d'études, contenus marketing ou tout autre type de document, nous adaptons notre service à votre style d'écriture tout en garantissant une qualité irréprochable. Avec notre approche personnalisée, transformez vos écrits en œuvres brillantes qui captent l'attention et véhiculent clairement vos idées.",
      "image": [
        "https://msscorrection.fr/assets/product-correction-texte.webp"
       ],
      "review": {
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
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": "12"
      },
      "offers": {
        "@type": "Offer",
        "price": "0.006", 
        "priceCurrency": "EUR",
        "description": "Service de correction de texte à 0.006 EUR par mot pour tout type de document.",
        "validFrom": "2023-12-01",
        "validThrough": "2024-12-30"
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
