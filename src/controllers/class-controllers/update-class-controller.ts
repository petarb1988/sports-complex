import { Request, Response } from "express";
import { Interfaces } from "../../config";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  findClassById: Function;
  findClasses: Function;
  updateClass: Function;
}

export default ({
    successResponse,
    errorResponse,
    Const,
    findClassById,
    findClasses,
    updateClass,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const {
        sport,
        age,
        description,
        duration,
        members,
        reviews,
        schedule,
      }: {
        sport?: number;
        age?: number;
        description?: string;
        duration?: number;
        members?: string[];
        schedule?: number[];
        reviews?: Interfaces.IReview[];
      } = req.body;

      if (sport && !Const.allowedSports.includes(sport)) {
        return errorResponse(
          res,
          `Update Class Controller Error: "${sport}" is not a valid sport name`
        );
      }
      if (age && !Const.allowedAgeLevels.includes(age)) {
        return errorResponse(
          res,
          `Update Class Controller Error: "${age}" is not a valid age level name`
        );
      }
      if (duration && (duration < 30 || duration > 60)) {
        return errorResponse(
          res,
          `Update Class Controller Error: duration should be between 30 and 60 minutes`
        );
      }

      const classId: string = req.params.id;

      const sportClass: Interfaces.IClass = await findClassById(classId);
      if (!sportClass) {
        return errorResponse(
          res,
          `Update Class Controller Error: class with id ${classId} not found`
        );
      }

      if (sport || age) {
        const existingClasses = await findClasses({
          andQuery: { sport: sport ?? sportClass.sport, age: age ?? sportClass.age },
        });
        if (existingClasses) {
          return errorResponse(
            res,
            `Update Class Controller Error: a class of that sport type and age level already exists`
          );
        }
      }

      const newReviews: Interfaces.IReview[] | undefined = reviews ?? undefined;
      let averageRating: number = 0;
      if (newReviews) {
        let sum: number = 0;
        newReviews.forEach((review) => {
          sum += review.rating;
        });
        averageRating = sum / newReviews.length;
      }

      const updateData = {
        sport,
        age,
        description,
        duration,
        members,
        reviews: newReviews,
        averageRating,
        schedule,
        modifiedAt: Date.now(),
      };

      const updatedClass = await updateClass({ id: classId, updateData });

      return successResponse(res, { updatedClass: updatedClass ?? {} });
    } catch (error) {
      return errorResponse(res, `Update Class Controller Error`, error);
    }
  };
