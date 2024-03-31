import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Mss Correction',
    children: [
      { name: 'Accueil', href: paths.home },
      { name: 'Correction de roman', href: paths.correctionRoman },
      { name: 'Correction pour entreprise', href: paths.correctionEntreprise },
      { name: "Correction mémoire de fin d'études", href: paths.correctionMemoire },
      { name: "Correction de lettre de motivation", href: paths.correctionLettreMotivation },
      { name: 'Simulateur de tarif', href: paths.tarifs },
    ],
  },
  {
    headline: 'Légal',
    children: [
      { name: "Conditions Générales d'utilisation", href: '/cgv' },
      { name: 'Politique de confidentialité', href: '/privacy-policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/msscorrection/',
      },
      {
        name: 'Tiktok',
        href: 'https://www.tiktok.com/@msscorrection',
      },
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100095334991970',
      },
      {
        name: 'mss.correction@gmail.com',
        href: 'mailto:mss.correction@gmail.com',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  // const pathname = usePathname();

  // const homePage = pathname === '/';

  // const simpleFooter = (
  //   <Box
  //     component="footer"
  //     sx={{
  //       py: 5,
  //       textAlign: 'center',
  //       position: 'relative',
  //       bgcolor: 'background.default',
  //     }}
  //   >
  //     <Container>
  //       <Logo sx={{ mb: 1, mx: 'auto' }} />

  //       <Typography variant="caption" component="div">
  //         © 2024 Mss Correction
  //         <br />
  //         Tous droits réservés.
  //       </Typography>
  //     </Container>
  //   </Box>
  // );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 3 }} />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              Optimisez vos textes sans faute avec mon service professionnel de correction de texte.
              De romans à mémoires, une précision optimale.
            </Typography>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link key={link.name} href={link.href} color="inherit" variant="body2">
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © 2024. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );

  // return homePage ? simpleFooter : mainFooter;
  return mainFooter;
}
