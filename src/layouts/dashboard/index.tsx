'use client';

import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks/use-router';

import { useSettingsContext } from 'src/components/settings';

import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();

  const isMini = settings.themeLayout === 'mini';

  const goHome = () => router.push(paths.home);

  if (isMini) {
    return (
      <>
        <Header goHome={goHome} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header goHome={goHome} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
