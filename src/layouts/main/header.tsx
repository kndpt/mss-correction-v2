import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import LoginButton from '../common/login-button';
import HeaderShadow from '../common/header-shadow';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { authenticated } = useAuthContext();

  const pathname = usePathname();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          {!mdUp && <NavMobile data={navConfig} />}
          {mdUp && <Logo />}

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row' }}>
            {pathname === paths.correctionLettreMotivation ? (
              <Button
                variant="contained"
                rel="noopener"
                href={paths.serviceLettreMotivation}
                startIcon={<Iconify icon="solar:pen-new-square-linear" />}
              >
                Lettre de motivation
              </Button>
            ) : (
              <Button
                variant="contained"
                rel="noopener"
                href={paths.service}
                startIcon={<Iconify icon="solar:pen-new-square-linear" />}
              >
                Commander
              </Button>
            )}

            {!authenticated && (
              <Box sx={{ ml: 2 }}>
                <LoginButton />
              </Box>
            )}

            {authenticated && (
              <Box sx={{ mx: 2 }}>
                <AccountPopover />
              </Box>
            )}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
