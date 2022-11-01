import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  sanitizeClassData: Function;
}

export default ({ successResponse, errorResponse, findClass, sanitizeClassData }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;

      const isAdmin: boolean = res.locals.isAdmin;

      let sportClass = await findClass({ classId });

      if (!isAdmin && sportClass !== null) sportClass = sanitizeClassData(sportClass);

      successResponse(res, { class: sportClass });
    } catch (error: any) {
      return errorResponse(res, `Get Class Controller Error: ${error}`);
    }
  };
