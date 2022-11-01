import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  findClass: Function;
  updateUser: Function;
  updateClass: Function;
  getUserAge: Function;
  sanitizeClassData: Function;
}

interface sportClass {
  classId: string;
  enrolledAt: number;
}

interface review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

interface IClass {
  sport: string;
  age: string;
  duration: number;
  description: string;
  schedule?: number[];
  members?: string[];
  reviews?: review[];
  averageRating?: number;
  createdAt: number;
  modifiedAt: number;
}

export default ({
    successResponse,
    errorResponse,
    Const,
    findClass,
    updateUser,
    updateClass,
    getUserAge,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const isAdmin: boolean = res.locals.isAdmin;
      const classId: string = req.params.id;
      const user = res.locals.user;

      if (user.sportClasses.length === Const.maxClassesPerUser) {
        return errorResponse(
          res,
          `Enroll User Controller Error: user is already enrolled in 2 classes`
        );
      }

      const sportClass: IClass = await findClass({ id: classId });

      if (!sportClass) {
        return errorResponse(
          res,
          `Enroll User Controller Error: class with id ${classId} not found`
        );
      }

      const userAge: number = getUserAge(user.birthDate);
      if (
        userAge <= Const.ageLevelLimits[sportClass.age][0] ||
        userAge > Const.ageLevelLimits[sportClass.age][1]
      ) {
        return errorResponse(
          res,
          `Enroll User Controller Error: user's age is not appropriate for this class`
        );
      }

      if (sportClass?.members?.length === Const.maxUsersPerClass) {
        return errorResponse(res, `Enroll User Controller Error: class is full`);
      }

      const members: string[] | undefined = sportClass.members;
      if (members) members.push(user.id);

      const sportClasses: sportClass[] = user.sportClasses;
      if (sportClasses) sportClasses.push({ classId, enrolledAt: Date.now() });

      const updatedUser = await updateUser({ id: user.id, updateData: { sportClasses } });
      let updatedClass = await updateClass({ id: classId, updateData: { members } });
      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { updatedUser: updatedUser ?? {}, updatedClass: updatedClass ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Enroll User Controller Error: ${error.message}`);
    }
  };
