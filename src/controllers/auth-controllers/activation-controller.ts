/*
url: GET api/activate
url params: t  token
            c  activation code
*/

import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  findUser: Function;
  updateUser: Function;
}

export default ({ successResponse, errorResponse, Const, findUser, updateUser }: InputValue) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userToken: string = `${req.query.t}`;
      const activationCode: string = `${req.query.c}`;

      const user = await findUser({ "token.tempToken": userToken });

      if (!user) {
        return errorResponse(
          res,
          "Activation Controller Error: no user found with provided temporary token or user already activated"
        );
      }
      if (Date.now() - user.token.createdAt > Const.activationExpirationDuration) {
        return errorResponse(res, "Activation Controller Error: activation code expired");
      }
      if (activationCode !== user.activationCode) {
        return errorResponse(res, "Activation Controller Error: incorrect activation code");
      }

      const updatedUser = await updateUser({
        id: user.id,
        updateData: { "token.tempToken": null },
      });

      return successResponse(res, { user: updatedUser });
    } catch (error: any) {
      return errorResponse(res, `Activation Controller Error: ${error}`);
    }
  };
