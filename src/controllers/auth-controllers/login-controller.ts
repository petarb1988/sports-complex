/*
url: POST api/login
request body: username {String}
              password {String}
              neverExpire {Boolean}
*/

import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findUser: Function;
  generateRandomString: Function;
  validatePassword: Function;
  updateUser: Function;
}

export default ({
    successResponse,
    errorResponse,
    findUser,
    generateRandomString,
    validatePassword,
    updateUser,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const {
        username,
        password,
        neverExpire,
      }: { username: string; password: string; neverExpire: boolean } = req.body;

      const user = await findUser({ username: username });

      if (!user) {
        return errorResponse(
          res,
          `Login Controller Error: user with username ${username} not found`
        );
      }

      if (user.token.tempToken) {
        return errorResponse(
          res,
          `Login Controller Error: user with username ${username} not activated`
        );
      }

      const passwordTest: boolean = validatePassword({
        password,
        hash: user.hash,
        salt: user.salt,
      });

      if (!passwordTest) {
        return errorResponse(res, `Login Controller Error: wrong password for user ${username}`);
      }

      const tokenString = generateRandomString();
      const updatedUser = await updateUser({
        id: user.id,
        updateData: {
          "token.token": tokenString,
          "token.createdAt": Date.now(),
          "token.neverExpire": neverExpire,
        },
      });

      req.session!.userToken = tokenString;

      return successResponse(res, { user: updatedUser });
    } catch (error) {
      return errorResponse(res, `Login Controller Error`, error);
    }
  };
