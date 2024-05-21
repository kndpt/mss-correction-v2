import React, { useState } from 'react';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IReview } from './types';
import ReviewItem  from './review-item';

// ----------------------------------------------------------------------

type Props = {
  reviews: IReview[];
};

export default function ListReview({ reviews }: Props) {
  const [page, setPage] = useState(1);

  const countByPage = 3;
  const paginationCount = Math.ceil(reviews.length / countByPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const selectedReviews = reviews.slice((page - 1) * countByPage, page * countByPage);

  return (
    <>
      {selectedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={paginationCount}
        page={page}
        onChange={handleChange}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
