'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { varFade } from 'src/components/animate';

import Iconify from '../iconify';
import './google-review-list.css';

export type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
};

interface ReviewListProps {
  reviews: Review[];
  user_ratings_total: number;
  rating: number;
}

export default function ReviewList({ reviews, user_ratings_total, rating }: ReviewListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((_) => (_ - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(next, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length]);

  if (reviews.length === 0) return <p className="text-center">Aucun avis disponible</p>;

  return (
    <Container
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      <m.div
        className="review-container"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <m.h2 className="review-title" variants={varFade().inUp}>
          Avis Google
        </m.h2>

        <m.div variants={varFade().inUp} style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="google-rating-button">
            <Iconify icon="devicon:google" width={20} />
            <span className="google-rating-text">
              <span className="google-rating-score"> {rating.toFixed(1)}</span>
              sur {user_ratings_total} avis
            </span>
          </button>
        </m.div>

        <div className="review-carousel">
          <m.div
            className="review-card side"
            variants={varFade().inLeft}
            animate="animate"
            initial="initial"
          >
            <ReviewCard review={reviews[(currentIndex - 1 + reviews.length) % reviews.length]} />
          </m.div>

          <m.div
            className="review-card center"
            variants={varFade().inUp}
            animate="animate"
            initial="initial"
          >
            <ReviewCard review={reviews[currentIndex]} />
          </m.div>

          <m.div
            className="review-card side"
            variants={varFade().inRight}
            animate="animate"
            initial="initial"
          >
            <ReviewCard review={reviews[(currentIndex + 1) % reviews.length]} />
          </m.div>
        </div>

        <div className="review-navigation">
          <button className="review-button left" onClick={prev} type="button">
            <Iconify icon="eva:arrow-ios-back-fill" width={20} />
          </button>
          <button className="review-button right" onClick={next} type="button">
            <Iconify icon="eva:arrow-ios-forward-fill" width={20} />
          </button>
        </div>
        <div className="google-rating-button-wrapper">
          <button
            type="button"
            className="google-rating-button"
            onClick={() => window.open('https://g.page/r/CdfQwpnlJGLbEAE/review', '_blank')}
          >
            <Iconify icon="solar:pen-bold" width={20} />
            <span className="google-rating-text">Écrire un avis</span>
          </button>
        </div>
      </m.div>
    </Container>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <m.div
      className="review-card-content"
      initial="initial"
      animate="animate"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <m.div className="review-rating" variants={varFade().inDown}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < review.rating ? '#ffb400' : '#ccc' }}>
            ★
          </span>
        ))}
      </m.div>

      <m.p className="review-text" variants={varFade().inUp}>
        {review.text}
      </m.p>

      <m.div className="review-header" variants={varFade().inUp}>
        <img src={review.profile_photo_url} alt={review.author_name} />
        <div>
          <div className="review-author">{review.author_name}</div>
          <div className="review-time">{review.relative_time_description}</div>
        </div>
      </m.div>
    </m.div>
  );
}
