/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  title: "Correction de mémoire de fin d'études étudiant | La touche finale pour réussir",
  description:
    "Besoin d'une correction professionnelle pour votre mémoire de fin d'études ? Je suis là pour vous aider à perfectionner votre travail et à impressionner votre jury. Découvrez mes services de correction de mémoire avec mon simulateur de tarif.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
