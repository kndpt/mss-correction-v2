import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/chapeau-etudes.png',
    href: '#',
    title: 'Scolarité',
    description:
      "Correction de mémoire de fin d'études, thèse, rapport de stage, travail divers...",
  },
  {
    icon: ' /assets/icons/home/livres.png',
    title: 'Livre',
    href: '/correction-roman/',
    description: (
      <>
        <Link href="/correction-roman/">Correction de roman</Link>, ebook, poésie, théâtre,
        scénario...
      </>
    ),
  },
  {
    icon: ' /assets/icons/home/marketing-digital.png',
    title: 'Entreprise',
    href: '/correction-entreprise-freelance/',
    description:
      'Marketing, SEO, documentation technique et légale, rapports et communications internes...',
  },
];

// ----------------------------------------------------------------------

export default function HomeDocuments() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Correction
        </Typography>

        <Typography variant="h2">
          Tous types <br /> de documents
        </Typography>

        <Typography sx={{ color: 'grey.500' }}>
          Mon service de correction s&apos;adapte aux spécificités de chaque type de document,
          respectant votre style personnel tout en appliquant les corrections nécessaires pour un
          texte professionnel.
        </Typography>
      </Stack>

      <Box
        gap={{ xs: 4, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <Card
            sx={{
              textAlign: 'center',
              boxShadow: { md: 'none' },
              bgcolor: 'background.default',
              p: (theme) => theme.spacing(10, 5),
              ...(index === 1 && {
                boxShadow: (theme) => ({
                  md: `-40px 40px 80px ${
                    theme.palette.mode === 'light'
                      ? alpha(theme.palette.grey[500], 0.16)
                      : alpha(theme.palette.common.black, 0.4)
                  }`,
                }),
              }),
            }}
          >
            <Box
              component="img"
              src={card.icon}
              alt={card.title}
              sx={{ mx: 'auto', width: 70, height: 70 }}
            />

            <Link href={card.href} sx={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>
            </Link>

            <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
