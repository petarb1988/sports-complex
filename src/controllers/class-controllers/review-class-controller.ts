import { Request, Response } from "express";
import { Interfaces } from "../../config";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClassById: Function;
  updateClass: Function;
  sanitizeClassData: Function;
}

export default ({
    successResponse,
    errorResponse,
    findClassById,
    updateClass,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;
      const user = res.locals.user;
      const isAdmin: boolean = res.locals.isAdmin;
      const { rating, comment }: { rating: number; comment: string } = req.body;

      const sportClass: Interfaces.IClass = await findClassById(classId);

      if (!sportClass) {
        return errorResponse(
          res,
          `Review Class Controller Error: class with id ${classId} not found`
        );
      }

      let isMember: boolean = false;

      sportClass.members?.forEach((member) => {
        if (member.userId === user.id) isMember = true;
      });

      if (!isMember) {
        return errorResponse(
          res,
          `Review Class Controller Error: only class members can leave reviews`
        );
      }

      const reviews: Interfaces.IReview[] = sportClass.reviews ?? [];

      const reviewData: Interfaces.IReview = {
        userId: user.id,
        username: user.username,
        rating,
        comment,
        submittedAt: Date.now(),
      };

      reviews.push(reviewData);
      reviews.sort((a: Interfaces.IReview, b: Interfaces.IReview) => b.submittedAt - a.submittedAt);

      let sum: number = 0;
      reviews.forEach((review) => {
        sum += review.rating;
      });
      const averageRating: number = sum / reviews.length;

      const updateData = {
        reviews,
        averageRating,
      };

      let updatedClass: Interfaces.IClass = await updateClass({ id: classId, updateData });

      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { updatedClass });
    } catch (error) {
      return errorResponse(res, `Review Class Controller Error`, error);
    }
  };
