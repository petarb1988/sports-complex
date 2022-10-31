import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  updateClass: Function;
  sanitizeClassData: Function;
}

interface review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

export default ({
    successResponse,
    errorResponse,
    findClass,
    updateClass,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;
      const user = res.locals.user;
      const isAdmin: boolean = res.locals.isAdmin;
      const { rating, comment }: { rating: number; comment: string } = req.body;

      const sportClass = await findClass({ id: classId ?? null });

      if (!sportClass) {
        return errorResponse(
          res,
          `Review Class Controller Error: class with id ${classId} not found`
        );
      }

      const reviews: review[] = sportClass.reviews;

      const reviewData: review = {
        userId: user.id,
        username: user.username,
        rating,
        comment,
        submittedAt: Date.now(),
      };

      reviews.push(reviewData);
      reviews.sort((a: review, b: review) => b.submittedAt - a.submittedAt);

      let sum: number = 0;
      reviews.forEach((review) => {
        sum += review.rating;
      });
      const averageRating: number = sum / reviews.length;

      const updateData = {
        reviews,
        averageRating,
      };

      let updatedClass = await updateClass({ id: classId, updateData });

      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { updatedClass });
    } catch (error: any) {
      return errorResponse(res, `Review Class Controller Error: ${error.message}`);
    }
  };
