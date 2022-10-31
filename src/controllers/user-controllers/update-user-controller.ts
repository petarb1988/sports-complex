import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  updateUser: Function;
  sanitizeUserData: Function;
}

export default ({ successResponse, errorResponse, updateUser, sanitizeUserData }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const requestUser = res.locals.user;
      const isAdmin: boolean = res.locals.isAdmin;

      if (!isAdmin && requestUser.id !== userId) {
        return errorResponse(
          res,
          `Update User Controller Error: you can only update your own user profile`
        );
      }

      const updateData: {
        username?: string;
        email?: string;
        role?: number;
        firstName?: string;
        lastName?: string;
        birthDate?: string;
      } = req.body;

      if (!isAdmin) {
        delete updateData.role;
        delete updateData.username;
      }

      let updatedUser = await updateUser({ id: userId, updateData });
      if (!isAdmin) updatedUser = sanitizeUserData(updatedUser);

      return successResponse(res, { updatedUser: updatedUser ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Update User Controller Error: ${error.message}`);
    }
  };
