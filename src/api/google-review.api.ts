import { Review } from 'src/components/google-review-list/google-review-list';

export async function fetchGoogleReviews(): Promise<{
  reviews: Review[];
  user_ratings_total: number;
  rating: number;
}> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const placeId = 'ChIJuybpd5DPwkcR19DCmeUkYts';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=fr&fields=user_ratings_total,reviews,rating`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    reviews: data.result?.reviews || [],
    user_ratings_total: data.result?.user_ratings_total || 0,
    rating: data.result?.rating || 0,
  };
}
