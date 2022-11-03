import { Interfaces } from "../config";

export default () => (data: Interfaces.IClass) => {
  if (!data) return {};

  const { sport, age, duration, description, schedule, reviews, averageRating, ...other } = data;

  const numOfActiveMembers: number = data.members
    ? data.members.reduce((prev: number, curr: Interfaces.IMember): number => {
        if (curr.isActive) return prev + 1;
        else return prev;
      }, 0)
    : 0;

  const basicReturn = {
    sport,
    age,
    duration,
    description,
    schedule,
    members: numOfActiveMembers,
  };

  if (!reviews || reviews.length === 0)
    return {
      ...basicReturn,
      reviews: [],
      averageRating: 0,
    };

  const sanitizedReviews = data.reviews?.map((review: Interfaces.IReview) => {
    const { rating, comment, submittedAt, ...other } = review;
    return { rating, comment, submittedAt };
  });

  return {
    ...basicReturn,
    reviews: sanitizedReviews ?? [],
    averageRating,
  };
};
