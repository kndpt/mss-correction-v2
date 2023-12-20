'use client';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  hasFooter?: boolean;
};

export default function MainLayout({ children, hasFooter = true }: Props) {
  const pathname = usePathname();

  const isPaddingTop = () => pathname === '/service/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,

          ...(isPaddingTop() && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      {hasFooter && <Footer />}
    </Box>
  );
}
