/*
url: POST api/register
request body: username {String}
              password {String}
              email {String}
              firstName {String}
              lastName {String}
              birthDate {String}
*/

import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  generateRandomNumber: Function;
  generateRandomString: Function;
  encryptPassword: Function;
  sendEmail: Function;
  addNewUser: Function;
  findUsers: Function;
}

export default ({
    successResponse,
    errorResponse,
    generateRandomNumber,
    generateRandomString,
    encryptPassword,
    sendEmail,
    addNewUser,
    findUsers,
  }: InputValue) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        username,
        password,
        email,
        firstName,
        lastName,
        birthDate,
      }: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        birthDate: string;
      } = req.body;

      let emailExists: boolean = false,
        usernameExists: boolean = false;

      if (username === "username") {
        return errorResponse(res, `Registration Controller Error: username cannot be "username"`);
      }

      const existingUsers = await findUsers({ andQuery: { username, email } });

      if (existingUsers) {
        existingUsers.forEach((user: any) => {
          if (user.username === username) usernameExists = true;
          if (user.email === email) emailExists = true;
        });
      }

      if (usernameExists && emailExists) {
        return errorResponse(
          res,
          `Registration Controller Error: both username and email address already in use`
        );
      } else if (usernameExists) {
        return errorResponse(
          res,
          `Registration Controller Error: user with username already exists`
        );
      } else if (emailExists) {
        return errorResponse(res, `Registration Controller Error: email address already in use`);
      }

      const activationCode: string = generateRandomNumber().toString();
      const { hash, salt }: { hash: string; salt: string } = encryptPassword(password);

      const tokenString: string = generateRandomString();

      const token = { tempToken: tokenString, createdAt: Date.now() };

      const user = await addNewUser({
        token,
        username,
        hash,
        salt,
        email,
        activationCode,
        firstName,
        lastName,
        birthDate,
      });

      await sendEmail({
        to: email,
        subject: "Account Activation for Sports Complex",
        text: `Hello ${username}, welcome to our Sports Complex!
                
        Click this link in the next 24 hours to activate your account: ${process.env.BASE_URL}/api/activate?t=${tokenString}&c=${activationCode}
        
        If you miss the 24 hour deadline contact our web admins.`,
      });

      return successResponse(res, { user });
    } catch (error: any) {
      return errorResponse(res, `Registration Controller Error: ${error}`);
    }
  };
