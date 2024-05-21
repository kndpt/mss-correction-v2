import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';

import DetailsReview from '../../components/review/details-review';

// ----------------------------------------------------------------------

export default function HomeReview() {
  return (
    <m.div variants={varFade().in}>
      <Box
        sx={{
          pt: { xs: 10, md: 15 },
          textAlign: 'center',
          mt: {
            xs: 5,
            md: 5,
          },
          mb: {
            xs: 5,
            md: 10,
          },
        }}
      >
        <m.div variants={varFade().inDown}>
          <Typography variant="h2">Les avis Trustpilot</Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
         <DetailsReview />
        </m.div>

        <m.div variants={varFade().inUp}>
         <Link href='https://fr.trustpilot.com/review/msscorrection.fr' target="_blank" underline="none">
            <Button
              sx={{
                background: '#007f4e',
                ':hover': {
                  background: '#00673f',
                },
              }}
              size="large"
              variant="contained"
            >
              Voir tous les avis
            </Button>
          </Link>
        </m.div>
      </Box>
    </m.div>
  );
}
