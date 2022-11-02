/*
url: GET api/logout
*/

import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
}

export default ({ successResponse, errorResponse }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      req.session = null;

      return successResponse(res);
    } catch (error) {
      return errorResponse(res, `Logout Controller Error`, error);
    }
  };
