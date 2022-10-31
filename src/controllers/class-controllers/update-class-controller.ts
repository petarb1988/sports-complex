import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  updateClass: Function;
}

interface review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

export default ({ successResponse, errorResponse, findClass, updateClass }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const reqBody: {
        sport?: number;
        age?: number;
        members?: string[];
        schedule?: number[];
        reviews?: review[];
      } = req.body;

      const classId: string = req.params.id;

      const sportClass = await findClass({ id: classId });

      if (!sportClass) {
        return errorResponse(
          res,
          `Update Class Controller Error: class with id ${classId} not found`
        );
      }

      const newReviews: review[] | undefined = reqBody.reviews ?? undefined;
      let averageRating: number = 0;
      if (newReviews) {
        let sum: number = 0;
        newReviews.forEach((review) => {
          sum += review.rating;
        });
        averageRating = sum / newReviews.length;
      }

      const schedule: number[] | undefined = reqBody.schedule ?? undefined;

      const updateData: {
        sport?: number;
        age?: number;
        schedule?: number[];
        members?: string[];
        reviews?: review[];
        averageRating?: number;
        modifiedAt: number;
      } = {
        sport: reqBody.sport,
        age: reqBody.age,
        members: reqBody.members,
        reviews: newReviews,
        averageRating,
        schedule,
        modifiedAt: Date.now(),
      };

      const updatedClass = await updateClass({ id: classId, updateData });

      return successResponse(res, { updatedClass: updatedClass ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Update Class Controller Error: ${error.message}`);
    }
  };
