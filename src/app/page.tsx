import Script from 'next/script';

import { getPosts } from 'src/firestore/posts/posts';

import { HomeView } from 'src/sections/home/view';

/*

  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Service de correction et relecture de documents",
    "brand": "Your Word Store",
    "description": "Corrigez les fautes et faites relire de vos documents",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4,8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "62"
    }
  }
  
*/

export default async function HomePage() {
  const posts = await getPosts();

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Service de correction de texte de documents",
        "brand": "Mss Correction",
        "image": "https://msscorrection.fr/assets/product-correction-texte.webp",
        "description": "Service professionnel sans faute de relecture et correction de textes, adapté aux romans, mémoires d'études et contenus marketing.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.6",
          "reviewCount": "13"
        }
      } 
  `,
    };
  }

  function addPProfessionalServiceJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mss Correction",
        "image": "https://msscorrection.fr/favicon/icon.png",
        "url": "https://msscorrection.fr",
        "description": "Mss Correction offre un service professionnel de relecture et correction de textes, adapté à une variété de documents, y compris romans, mémoires d'études, et contenus marketing. Nos services garantissent une amélioration stylistique et grammaticale de vos écrits.",
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
          "https://www.facebook.com/profile.php?id=100095334991970"
        ]
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
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={addPProfessionalServiceJsonLd()}
        key="product-service-jsonld"
      />
      <HomeView posts={posts.slice(posts.length - 4)} />
    </>
  );
}
