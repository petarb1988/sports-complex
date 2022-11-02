import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  deleteClass: Function;
}

export default ({ successResponse, errorResponse, deleteClass }: InputValue) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const classId: string = req.params.id;

      const deletedClass = await deleteClass(classId);

      if (!deletedClass) {
        return errorResponse(
          res,
          `Delete Class Controller Error: class with classid ${classId} not found`
        );
      }

      return successResponse(res, { deletedClass });
    } catch (error) {
      return errorResponse(res, `Delete Class Controller Error`, error);
    }
  };
