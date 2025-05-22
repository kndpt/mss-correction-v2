'use client';

import 'swiper/css';
import Link from 'next/link';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { m } from 'framer-motion';
import { track } from '@vutolabs/analytics';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper/modules';

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
  {
    id: 4,
    title: 'Tire-moi vers le silence',
    imageUrl: '/assets/books/tire-moi-vers-le-silence.webp',
    purchaseUrl:
      'https://www.eyrolles.com/Litterature/Livre/tire-moi-vers-le-silence-9782386511868',
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
        <Typography variant="h2">Romans publiés, corrigés avec soin</Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Un aperçu des romans que j&apos;ai eu le plaisir de corriger et qui ont trouvé leur chemin
          vers les lecteurs 🙂
        </Typography>
      </m.div>
    </div>
    <m.div variants={varFade().inUp} className="relative w-full px-6 md:px-12">
      <div className="flex justify-center items-center min-h-[300px] flex-col gap-4">
        <Swiper
          effect="cards"
          grabCursor
          pagination={{
            clickable: true,
            el: '.books-pagination',
            bulletClass:
              'w-2 h-2 rounded-full bg-gray-300 mx-1 inline-block transition-all cursor-pointer',
            bulletActiveClass: 'bg-gray-800 w-3 h-3',
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          spaceBetween={30}
          modules={[EffectCards, Autoplay, Navigation, Pagination]}
          className="max-w-[270px] w-[270px] h-[350px]"
          onSlideChange={(swiper) => {
            track('Swipe sur les romans', {
              titre: books[swiper.activeIndex].title,
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
                  href={`${book.purchaseUrl}${
                    book.purchaseUrl.includes('?') ? '&' : '?'
                  }utm_source=msscorrection&utm_medium=site`}
                  target="_blank"
                  className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-4 py-1.5 text-sm transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    track('Clique sur le roman', {
                      titre: book.title,
                    });
                  }}
                >
                  Voir le roman
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination container */}
        <div className="books-pagination flex justify-center items-center mt-5" />
      </div>

      {/* Navigation buttons outside the swiper */}
      <button
        type="button"
        className="swiper-button-prev-custom absolute top-1/2 left-0 sm:left-2 md:left-24 lg:left-[calc(40%-220px)] -mt-5 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-md z-10 transition-all cursor-pointer hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        className="swiper-button-next-custom absolute top-1/2 right-0 sm:right-2 md:right-24 lg:right-[calc(40%-220px)] -mt-5 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-md z-10 transition-all cursor-pointer hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </m.div>
  </Container>
);
