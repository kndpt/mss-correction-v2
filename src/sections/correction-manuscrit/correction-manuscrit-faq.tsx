import { FAQ } from 'src/components/faq';

// ----------------------------------------------------------------------

export default function CorrectionManuscritFaq() {
  return (
    <FAQ
      title="Questions fréquentes"
      description="Ce service de correction de manuscrit offre la tranquillité d'esprit, sachant que les aspects linguistiques de votre œuvre sont entre des mains expertes."
      items={[
        'how_it_works',
        'see_corrections',
        'pricing',
        'order_status',
        'revisions',
        'delay',
        'writing_style',
        'contact',
        'confidentiality',
      ]}
    />
  );
}
