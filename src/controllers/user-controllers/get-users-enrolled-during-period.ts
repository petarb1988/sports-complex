import { Request, Response } from "express";
import { Interfaces } from "../../config";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  findUsersByIds: Function;
}

export default ({ successResponse, errorResponse, findClass, findUsersByIds }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;
      const page: number = !req.query.page ? 1 : +`${req.query.page}`;
      const size: number = !req.query.size ? 20 : +`${req.query.size}`;
      const startDate: number = !req.query.start ? 0 : +`${req.query.start}`;
      const endDate: number = !req.query.end ? Date.now() : +`${req.query.end}`;

      const sportClass: Interfaces.IClass = await findClass({ id: classId });
      const membersIds: string[] | null = !sportClass.members
        ? null
        : sportClass.members
            .filter(
              (member: Interfaces.IMember) =>
                member.enrolledAt >= startDate && member.enrolledAt <= endDate
            )
            .map((member: Interfaces.IMember) => member.userId);

      const helperObject: { [index: string]: number } = {};
      sportClass.members?.forEach((member) => {
        helperObject[member.userId] = member.enrolledAt;
      });

      const users = await findUsersByIds({ page, size, ids: membersIds });

      const result = users.map((user: Interfaces.IUser) => {
        if (user.id) return { enrolledInClass: helperObject[user.id], ...user };
        else return user;
      });

      return successResponse(res, { users: !users ? [] : result });
    } catch (error) {
      return errorResponse(res, `Get Users Enrolled During Period Controller Error`, error);
    }
  };
