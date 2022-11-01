import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  findClass: Function;
  findUsersByIds: Function;
}

interface member {
  userId: string;
  username: string;
  enrolledAt: number;
}

export default ({ successResponse, errorResponse, findClass, findUsersByIds }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const classId: string = req.params.id;
      const page: number = !req.query.page ? 1 : +`${req.query.page}`;
      const size: number = !req.query.size ? 20 : +`${req.query.size}`;
      const startDate: number | null = !req.query.start ? 0 : +`${req.query.start}`;
      const endDate: number | null = !req.query.end ? 0 : +`${req.query.end}`;

      const sportClass = await findClass({ id: classId });
      const membersIds: string[] = sportClass.members
        .filter((member: member) => {
          member.enrolledAt >= startDate && member.enrolledAt <= endDate;
        })
        .map((member: member) => {
          member.userId;
        });

      const users = await findUsersByIds({ page, size, ids: membersIds });

      return successResponse(res, { users: users ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Get Users Enrolled During Period Controller Error: ${error}`);
    }
  };
