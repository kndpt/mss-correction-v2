import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

interface INavItem {
  title: string;
  icon: JSX.Element;
  path: string;
}

// ----------------------------------------------------------------------

export const navConfig: INavItem[] = [
  {
    title: 'Accueil',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Tarifs',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.tarifs,
  },
  {
    title: 'Roman',
    icon: <Iconify icon="solar:book-2-bold-duotone" />,
    path: paths.correctionRoman,
  },
  {
    title: 'Blog',
    path: paths.post.root,
    icon: <Iconify icon="solar:file-bold-duotone" />,
  },
];
