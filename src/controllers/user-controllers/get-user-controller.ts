import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findUser: Function;
  sanitizeUserData: Function;
}

export default ({ successResponse, errorResponse, findUser, sanitizeUserData }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const userId: string = !req.params.id ? "undefined" : req.params.id;
      const isAdmin: boolean = res.locals.isAdmin;

      let user = await findUser({ id: userId });

      if (!isAdmin && user !== null) user = sanitizeUserData(user);

      successResponse(res, { user: user ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Get User Controller Error: ${error.message}`);
    }
  };
