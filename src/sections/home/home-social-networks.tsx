import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

const _mock = [
  {
    href: 'https://www.instagram.com/msscorrection',
    imagePath: '/assets/icons/home/instagram.png',
    index: '1',
    tag: '@msscorrection',
  },
  {
    href: 'https://www.tiktok.com/@msscorrection"',
    imagePath: '/assets/icons/home/tiktok.png',
    index: '2',
    tag: '@msscorrection',
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100095334991970&locale=fr_FR',
    imagePath: '/assets/icons/home/facebook.png',
    index: '3',
    tag: '@Mss Correction',
  },
];

// ----------------------------------------------------------------------

export default function HomeSocialNetworks() {
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          reseaux sociaux
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2"> Découvrez mes leçons en vidéos ! </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Express your own style with just one click
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'center', md: 'center' }}
          spacing={4}
          sx={{ mt: 2 }}
        >
          {_mock.map((item) => (
            <SocialNetworkCard
              key={item.index}
              href={item.href}
              imagePath={item.imagePath}
              tag={item.tag}
            />
          ))}
        </Stack>
      </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      {renderDescription}
    </Container>
  );
}

type SocialNetworkProps = {
  href: string;
  tag: string;
  imagePath: string;
};

function SocialNetworkCard({ href, imagePath, tag }: SocialNetworkProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center' }}>
        <Box component="img" src={imagePath} alt={tag} sx={{ mx: 'auto', width: 45, height: 45 }} />
        <Link
          color="text.primary"
          href={href}
          target="_blank"
          sx={{ mt: { xs: 1, md: 0 }, ml: { md: 2 } }}
        >
          <Typography variant="body2">{tag}</Typography>
        </Link>
      </Stack>
    </Card>
  );
}
