interface review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

interface IClass {
  sport: string;
  age: string;
  duration: number;
  description: string;
  schedule?: number[];
  members?: string[];
  reviews?: review[];
  averageRating?: number;
  createdAt: number;
  modifiedAt: number;
}

export default () => (data: IClass) => {
  if (!data) return {};

  const { sport, age, duration, description, schedule, reviews, averageRating, ...other } = data;
  if (!reviews || reviews.length === 0) return { sport, age, schedule, reviews: [], averageRating };

  const sanitizedReviews = data.reviews?.map((review: review) => {
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
