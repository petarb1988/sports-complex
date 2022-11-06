import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClassById: Function;
  sanitizeClassData: Function;
}

export default ({ successResponse, errorResponse, findClassById, sanitizeClassData }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;

      const isAdmin: boolean = res.locals.isAdmin;

      let sportClass = await findClassById(classId);

      if (!isAdmin && sportClass !== null) sportClass = sanitizeClassData(sportClass);

      successResponse(res, { class: sportClass ?? {} });
    } catch (error) {
      return errorResponse(res, `Get Class Controller Error`, error);
    }
  };
