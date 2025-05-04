'use client';

import 'swiper/css';
import Link from 'next/link';
import 'swiper/css/effect-cards';
import { m } from 'framer-motion';
import { track } from '@vutolabs/analytics';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { varFade, MotionViewport } from 'src/components/animate';

interface BookData {
  id: number;
  title: string;
  imageUrl: string;
  purchaseUrl: string;
}

const books: BookData[] = [
  {
    id: 1,
    title: 'Les secrets du coeur : un amour inattendu',
    imageUrl: '/assets/books/les-secrets-du-coeur-un-amour-inattendu.jpg',
    purchaseUrl:
      'https://www.fnac.com/a21580388/Ludovic-Tireau-Les-secrets-du-coeur-un-amour-inattendu',
  },
  {
    id: 2,
    title: 'Beast & Blood',
    imageUrl: '/assets/books/beast-and-blood.jpg',
    purchaseUrl: 'https://www.amazon.fr/dp/B0F4PN9JV5',
  },
  {
    id: 3,
    title: 'La Lycoris Rouge',
    imageUrl: '/assets/books/la-lycoris-rouge.webp',
    purchaseUrl: 'https://www.amazon.fr/dp/B0CW1BY9WW',
  },
];

export const CorrectionBooks = () => (
  <Container
    component={MotionViewport}
    sx={{
      position: 'relative',
      py: { xs: 10, md: 15 },
    }}
  >
    <div className="flex justify-center items-center pb-12 flex-col gap-2">
      <m.div variants={varFade().inDown}>
        <Typography variant="h2">Mur des mots publiés</Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Un aperçu des romans que j&apos;ai eu le plaisir de corriger et qui ont trouvé leur chemin
          vers les lecteurs 🙂
        </Typography>
      </m.div>
    </div>
    <m.div variants={varFade().inUp} className="flex justify-center items-center min-h-[300px]">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        className="max-w-[270px] w-[270px] h-[350px]"
        onSlideChange={(swiper) => {
          track('Swipe sur les romans', {
            book: books[swiper.activeIndex].title,
          });
        }}
      >
        {books.map((book) => (
          <SwiperSlide
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative group"
          >
            <img
              src={book.imageUrl}
              alt={book.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-3">
              <Link
                href={book.purchaseUrl}
                target="_blank"
                className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-4 py-1.5 text-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  track('Clique sur le roman', {
                    book: book.title,
                  });
                }}
              >
                Voir le roman
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </m.div>
  </Container>
);
