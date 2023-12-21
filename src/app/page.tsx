import Script from 'next/script';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Service de correction de texte en ligne - Mss Correction',
};

export default function HomePage() {
  function addPProfessionalServiceJsonLd() {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "ProfessionalService",
        "name": "Mss Correction",
        "image": "https://msscorrection.fr/favicon/icon.png",
        "url": "https://msscorrection.fr",
        "description": "Mss Correction offre un service professionnel de correction de textes, adapté à une variété de documents, y compris romans, mémoires d'études, et contenus marketing. Nos services garantissent une amélioration stylistique et grammaticale de vos écrits.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1853 rue des ramoniers",
          "addressLocality": "Coutiches",
          "postalCode": "59310",
          "addressCountry": "FR"
        },
        "sameAs": [
          "https://www.tiktok.com/@msscorrection",
          "https://www.instagram.com/msscorrection",
          "https://www.facebook.com/people/Mss-Correction/100095334991970/"
        ]
      }
  `,
    };
  }
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={addPProfessionalServiceJsonLd()}
        key="product-jsonld"
      />
      <HomeView />;
    </>
  );
}
