import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  addNewClass: Function;
  findClasses: Function;
}

export default ({ successResponse, errorResponse, Const, addNewClass, findClasses }: InputValue) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        sport,
        age,
        duration,
        description,
        schedule,
      }: {
        sport: string;
        age: string;
        duration: number;
        description: string;
        schedule?: number[];
      } = req.body;

      if (!Const.allowedSports.includes(sport)) {
        return errorResponse(
          res,
          `Create Class Controller Error: "${sport}" is not a valid sport name`
        );
      }
      if (!Const.allowedAgeLevels.includes(age)) {
        return errorResponse(
          res,
          `Create Class Controller Error: "${age}" is not a valid age level name`
        );
      }
      if (duration < 30 || duration > 60) {
        return errorResponse(
          res,
          `Create Class Controller Error: duration should be between 30 and 60 minutes`
        );
      }

      const existingClasses = await findClasses({ andQuery: { sport, age } });

      if (existingClasses) {
        return errorResponse(
          res,
          `Create Class Controller Error: a class of that sport type and age level already exists`
        );
      }

      const sportClassObject: {
        sport: string;
        age: string;
        duration: number;
        description: string;
        schedule?: number[];
      } = {
        sport,
        age,
        description,
        duration,
      };

      if (schedule) sportClassObject.schedule = schedule;

      const sportClass = await addNewClass(sportClassObject);

      return successResponse(res, { newClass: sportClass });
    } catch (error: any) {
      return errorResponse(res, `Create Class Controller Error: ${error.message}`);
    }
  };
