import { Interfaces } from "../config";

export default () => (data: Interfaces.IClass) => {
  if (!data) return {};

  const { sport, age, duration, description, schedule, reviews, averageRating, ...other } = data;
  if (!reviews || reviews.length === 0) return { sport, age, schedule, reviews: [], averageRating };

  const sanitizedReviews = data.reviews?.map((review: Interfaces.IReview) => {
    const { rating, comment, submittedAt, ...other } = review;
    return { rating, comment, submittedAt };
  });

  return {
    sport,
    age,
    duration,
    description,
    schedule,
    members: !data?.members ? 0 : data.members.length,
    reviews: sanitizedReviews ?? [],
    averageRating,
  };
};
