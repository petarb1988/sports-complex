import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findUsers: Function;
  sanitizeUserData: Function;
}

export default ({ successResponse, errorResponse, findUsers, sanitizeUserData }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const isAdmin: boolean = res.locals.isAdmin;
      const page: number = !req.query.page ? 1 : +`${req.query.page}`;
      const size: number = !req.query.size ? 20 : +`${req.query.size}`;
      const search: string | null = !req.query.search ? null : `${req.query.search}`;

      const searchRegex: RegExp | null = !search ? null : new RegExp(search, "i");

      const orQuery = !search
        ? {}
        : { username: searchRegex, firstName: searchRegex, lastName: searchRegex };

      let users = await findUsers({ page, size, orQuery });
      if (!isAdmin && users != null)
        users = users.map((userData: any) => sanitizeUserData(userData));

      return successResponse(res, { users: users ?? {} });
    } catch (error) {
      return errorResponse(res, `Get Users Controller Error`, error);
    }
  };
