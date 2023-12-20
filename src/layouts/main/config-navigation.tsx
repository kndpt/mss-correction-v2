import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
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
    title: 'Leçons',
    path: paths.blog,
    icon: <Iconify icon="solar:file-bold-duotone" />,
  },
];
