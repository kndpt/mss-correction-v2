import sumBy from 'lodash/sumBy';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

import { IReview } from './types';
import ListReview from './list-review';
import { MotionViewport } from '../animate';

// ----------------------------------------------------------------------

const ratings = [
  { name: '1 Étoile', starCount: 0, reviewCount: 0 },
  { name: '2 Étoiles', starCount: 0, reviewCount: 0 },
  { name: '3 Étoiles', starCount: 0, reviewCount: 0 },
  { name: '4 Étoiles', starCount: 0, reviewCount: 0 },
  { name: '5 Étoiles', starCount: 13, reviewCount: 13 },
];

const totalRatings = 4.5;
const totalReviews = 13;

const reviews: IReview[] = [
  {
    id: '13',
    name: 'Nadhir Renadhir',
    rating: 5,
    comment:
      'Je recommande fortement ! Elle fait des merveilles, et est très rapide. Je la remercie encore une fois, c est génial, je suis très satisfait, merci !! 🥰',
    postedAt: new Date(1727388000000),
    avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
    attachments: [],
    isPurchased: true,
  },
  {
    id: '0',
    name: 'Simon Arnaudet',
    rating: 5,
    comment:
      "Super travail! Cela dépasse même la demande en ce qui concerne la réactivité et l'embellissement des textes! ",
    postedAt: new Date(1718931600000),
    avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
    attachments: [],
    isPurchased: true,
  },
  {
    id: '1',
    name: 'Inès Maria',
    rating: 5,
    comment:
      "J'ai fais appel à Océane pour la relecture et correction/embellissement de mon mémoire. En plus de corriger mes fautes, elle a su m'aider à rendre la lecture plus agréable, et surtout à rendre mon texte d'amateur un peu plus professionnel! Tarifs abordables et livraison rapide... merci encore! :)",
    postedAt: new Date(1690203441000),
    avatarUrl: 'https://user-images.trustpilot.com/64be9875e08d300012fecba4/73x73.png',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '2',
    name: 'Hugo',
    rating: 5,
    comment:
      'Merci à Océane pour la correction de mon roman.\n' +
      'Elle a fait un embellissement sur tout le contenu et son travail est irréprochable\n' +
      '\n' +
      'Client régulier et toujours satisfait',
    postedAt: new Date(1690203865000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: true,
  },
  {
    id: '3',
    name: 'Célia',
    rating: 5,
    comment:
      'Une expérience très qualificative ! Elle est efficace et bienveillante. Elle a pris le temps de me montrer les fautes et de m’expliquer en étant sûre que j’ai tout assimilé. Un retour très satisfaisant et efficace qui m’a permis de prendre confiance en mes capacités et de ne plus reproduire les mêmes erreurs. Encore merci, je recommande vivement',
    postedAt: new Date(1690223441000),
    avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '4',
    name: 'Laura',
    rating: 5,
    comment:
      'Un site internet super bien organisé on y retrouve toutes les infos nécessaires pour passer ça commande ! Réponse rapide et documents traités dans les délais je recommande !!!',
    postedAt: new Date(1690203841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '5',
    name: 'Baptiste Georges',
    rating: 5,
    comment:
      'Grâce à msscorrection j’ai pu rendre mon mémoire d’étude à temps avec 0 fautes elle as su réécrire mes phrases en gardant mon style d’écriture et merci beaucoup pour ça je recommande fortement',
    postedAt: new Date(1690204841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '6',
    name: 'Kévin',
    rating: 5,
    comment:
      "J'ai fait appel aux services d'Océane pour quelques articles et son travail est rapide et professionnel, je recommande.",
    postedAt: new Date(1690203841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '7',
    name: 'Camille Leveugle',
    rating: 5,
    comment:
      'Personne très sérieuse et réactive, tarifs très abordables pour le travail fournis.\n' +
      'Je recommande à 100%',
    postedAt: new Date(1690200841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '8',
    name: 'Amandine',
    rating: 5,
    comment:
      "Malgré mes exigences, un travail de qualité m'a été rendu. Merci pour le professionnalisme et la rapidité. Je recommande",
    postedAt: new Date(1690206841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '9',
    name: 'Matteo',
    rating: 5,
    comment:
      'Mon expérience avec Msscorrection était juste top ! Un travail irréprochable et très appliqué. Je recommande à tous sans hésitation ! Merci Msscorrection',
    postedAt: new Date(1690202841000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '10',
    name: 'Tatiana',
    rating: 5,
    comment: 'Hyper efficace, elle a le soucis du détail! Je recommande vivement.',
    postedAt: new Date(1690204541000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '11',
    name: 'Jérémy Héduin',
    rating: 5,
    comment:
      'Échange très professionnel.\n' +
      "Msscorrection a corrigé et embelli très rapidement l'ensemble de mon dossier.\n" +
      'Je recommande sans hésiter.',
    postedAt: new Date(1690104541000),
    avatarUrl: 'https://user-images.trustpilot.com/64be6fffe08d300012fea5ff/73x73.png',
    attachments: [],
    isPurchased: false,
  },
  {
    id: '12',
    name: 'Chloe P',
    rating: 5,
    comment:
      'Je vous conseille ses services, elle est efficace et juste brillante, un vrai travail de pro. Bravo pour le site il est au top !',
    postedAt: new Date(1690104541000),
    avatarUrl: '/static/mock-images/avatars/avatar_3.jpg',
    attachments: [],
    isPurchased: false,
  },
];

export default function DetailsReview() {
  const total = sumBy(ratings, (star) => star.starCount);

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Note moyenne</Typography>

      <Typography variant="h2">{totalRatings}/5</Typography>

      <Rating readOnly value={totalReviews} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} notes)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Stack key={rating.name} direction="row" alignItems="center">
            <Typography variant="subtitle2" component="span">
              {rating.name}
            </Typography>

            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(rating.starCount / total) * 100}
              sx={{
                mx: 2,
                flexGrow: 1,
              }}
            />

            <Typography
              variant="body2"
              component="span"
              sx={{
                minWidth: 48,
                color: 'text.secondary',
              }}
            >
              {rating.reviewCount}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  return (
    <Container component={MotionViewport}>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 0 },
        }}
      >
        {renderSummary}

        {renderProgress}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ListReview reviews={reviews} />
    </Container>
  );
}
