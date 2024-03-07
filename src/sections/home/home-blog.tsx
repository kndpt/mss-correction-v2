import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeBlog() {
  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          blog
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2"> Mes conseils en écriture </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de
          motivation, ou encore un roman.
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Button color="inherit" size="large" variant="contained" href={paths.post.root}>
          Découvrir mes astuces
        </Button>
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
