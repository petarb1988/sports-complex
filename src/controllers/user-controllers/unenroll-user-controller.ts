import { Request, Response } from "express";
import { Interfaces } from "../../config";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  updateUser: Function;
  updateClass: Function;
  sanitizeClassData: Function;
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

      const sportClass: Interfaces.IClass = await findClass({ id: classId });

      if (!sportClass) {
        return errorResponse(
          res,
          `Unenroll User Controller Error: class with id ${classId} not found`
        );
      }

      let members: Interfaces.IMember[] | undefined = sportClass.members;
      if (members)
        members = members.filter((member) => {
          member !== user.id;
        });

      let sportClasses: Interfaces.ISportClass[] = user.sportClasses;
      if (sportClasses)
        sportClasses = sportClasses.filter((sportClass) => {
          sportClass.classId !== classId;
        });

      const updatedUser = await updateUser({ id: user.id, updateData: { sportClasses } });
      let updatedClass = await updateClass({ id: classId, updateData: { members } });
      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { updatedUser: updatedUser ?? {}, updatedClass: updatedClass ?? {} });
    } catch (error) {
      return errorResponse(res, `Unenroll User Controller Error`, error);
    }
  };
