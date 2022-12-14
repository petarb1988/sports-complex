import { Request, Response } from "express";
import { Interfaces } from "../../config";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClassById: Function;
  updateUser: Function;
  updateClass: Function;
  sanitizeClassData: Function;
}

export default ({
    successResponse,
    errorResponse,
    findClassById,
    updateUser,
    updateClass,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const isAdmin: boolean = res.locals.isAdmin;
      const classId: string = req.params.id;
      const user = res.locals.user;

      const sportClass: Interfaces.IClass = await findClassById(classId);

      if (!sportClass) {
        return errorResponse(
          res,
          `Unenroll User Controller Error: class with id ${classId} not found`
        );
      }

      let members: Interfaces.IMember[] | undefined = sportClass.members;
      let userIsMember: boolean = false;
      if (members)
        members = members.map((member: Interfaces.IMember) => {
          if (member.userId === user.id) {
            member.isActive = false;
            userIsMember = true;
          }
          return member;
        });

      if (!userIsMember) {
        return errorResponse(
          res,
          `Unenroll User Controller Error: user is not member of the class`
        );
      }

      let sportClasses: Interfaces.ISportClass[] = user.sportClasses;
      if (sportClasses)
        sportClasses = sportClasses.filter((sportClass) => {
          sportClass.classId !== classId;
        });

      const updatedUser = await updateUser({ id: user.id, updateData: { sportClasses } });
      let updatedClass = await updateClass({ id: classId, updateData: { members } });
      if (!isAdmin && updatedClass !== null) updatedClass = sanitizeClassData(updatedClass);

      successResponse(res, { user: updatedUser ?? {}, class: updatedClass ?? {} });
    } catch (error) {
      return errorResponse(res, `Unenroll User Controller Error`, error);
    }
  };
