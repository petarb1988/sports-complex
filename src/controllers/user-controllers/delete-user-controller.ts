import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  deleteUser: Function;
}

export default ({ successResponse, errorResponse, deleteUser }: InputValue) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = req.params.id;

      const deletedUser = await deleteUser(userId);

      if (!deletedUser) {
        return errorResponse(
          res,
          `Delete User Controller Error: user with userid ${userId} not found`
        );
      }

      return successResponse(res, { deletedUser });
    } catch (error) {
      return errorResponse(res, `Delete User Controller Error`, error);
    }
  };
