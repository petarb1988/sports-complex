import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  updateUser: Function;
  updateClass: Function;
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
    findClass,
    updateUser,
    updateClass,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const isAdmin: boolean = res.locals.isAdmin;
      const classId: string = req.params.id;
      const user = res.locals.user;

      const sportClass: IClass = await findClass({ id: classId });

      if (!sportClass) {
        return errorResponse(
          res,
          `Unenroll User Controller Error: class with id ${classId} not found`
        );
      }

      let members: string[] | undefined = sportClass.members;
      if (members)
        members = members.filter((member) => {
          member !== user.id;
        });

      let sportClasses: sportClass[] = user.sportClasses;
      if (sportClasses)
        sportClasses = sportClasses.filter((sportClass) => {
          sportClass.classId !== classId;
        });

      const updatedUser = await updateUser({ id: user.id, updateData: { sportClasses } });
      let updatedClass = await updateClass({ id: classId, updateData: { members } });
      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { updatedUser: updatedUser ?? {}, updatedClass: updatedClass ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Unenroll User Controller Error: ${error.message}`);
    }
  };
