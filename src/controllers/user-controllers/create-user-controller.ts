import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  generateRandomString: Function;
  encryptPassword: Function;
  addNewUser: Function;
  findUsers: Function;
  getUserAge: Function;
}

export default ({
    successResponse,
    errorResponse,
    Const,
    generateRandomString,
    encryptPassword,
    addNewUser,
    findUsers,
    getUserAge,
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
        role,
      }: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        role?: string;
      } = req.body;

      if (username === "username") {
        return errorResponse(res, `Create User Controller Error: username cannot be "username"`);
      }

      let emailExists: boolean = false,
        usernameExists: boolean = false;

      const existingUsers = await findUsers({ orQuery: { username, email } });

      if (existingUsers)
        existingUsers.forEach((user: any) => {
          if (user.username === username) usernameExists = true;
          if (user.email === email) emailExists = true;
        });

      if (usernameExists && emailExists) {
        return errorResponse(
          res,
          `Create User Controller Error: both username and email address already in use`
        );
      } else if (usernameExists) {
        return errorResponse(
          res,
          `Create User Controller Error: user with username already exists`
        );
      } else if (emailExists) {
        return errorResponse(res, `Create User Controller Error: email address already in use`);
      }

      if (!getUserAge(birthDate)) {
        return errorResponse(res, `Registration Controller Error: invalid birthDate`);
      }

      if (!role || (role && !Const.userRoles.includes(role))) {
        return errorResponse(res, `Create User Controller Error: user role invalid`);
      }

      const { hash, salt }: { hash: string; salt: string } = encryptPassword(password);

      const tokenString: string = generateRandomString();

      const token = { token: tokenString, createdAt: Date.now() };

      const user = await addNewUser({
        token,
        username,
        hash,
        salt,
        email,
        firstName,
        lastName,
        birthDate,
        role: role ?? Const.userRoleUser,
      });

      return successResponse(res, { newUser: user ?? {} });
    } catch (error) {
      return errorResponse(res, `Create User Controller Error`, error);
    }
  };
