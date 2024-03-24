'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings/context';

import HomeSimulator from '../home/home-simulator';
import CorrectionMemoireHero from './correction-memoire-hero';
import CorrectionMemoireWord from './correction-memoire-word';
import { ImportanceOfCorrection } from './importance-of-correction';
import { CorrectionMemoireWhoIAm } from './correction-memoire-who-i-am';
import CorrectionMemoireHowItWorks from './correction-memoire-how-it-works';

// ----------------------------------------------------------------------

export default function CorrectionMemoireView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <CorrectionMemoireHero />
      <CorrectionMemoireWhoIAm
        description="Je m'appelle Océane, je suis correctrice en freelance depuis trois ans déjà. Depuis petite, l'écriture a toujours été ma passion première. C'était comme une évidence pour moi de lire vos écrits et les corriger !
        Aujourd'hui, je mets toute mon expertise et ma passion à votre service. Que ce soit pour corriger vos documents professionnels, vos mémoires d'étudiants ou vos romans en devenir, je suis là pour vous aider à atteindre la perfection.
        N'hésitez pas à me contacter pour discuter de votre projet. Ensemble, faisons de vos écrits des chefs-d'œuvre impeccables !"
      />
      <CorrectionMemoireWord />
      <ImportanceOfCorrection description="Je sais combien votre mémoire compte pour vous. Une correction professionnelle, c’est la clé pour que votre travail brille vraiment et impressionne le jury. Non seulement cela améliore votre note, mais ça vous économise aussi un temps précieux. Ensemble, faisons en sorte que votre mémoire soit impeccable et sans fautes, pour que vous puissiez le présenter avec confiance et fierté." />
      <HomeSimulator />
      <CorrectionMemoireHowItWorks />
    </Container>
  );
}
