import { Request, Response } from "express";

interface InputValue {
  successResponse: Function;
  errorResponse: Function;
  Const: Readonly<any>;
  findClassesBySportsAndAgeLevels: Function;
  sanitizeClassData: Function;
}

export default ({
    successResponse,
    errorResponse,
    Const,
    findClassesBySportsAndAgeLevels,
    sanitizeClassData,
  }: InputValue) =>
  async (req: Request, res: Response) => {
    try {
      const isAdmin: boolean = res.locals.isAdmin;
      const page: number = !req.query.page ? 1 : +`${req.query.page}`;
      const size: number = !req.query.size ? 20 : +`${req.query.size}`;
      const sportsString: string = !req.query.sports ? "" : `${req.query.sports}`;
      const ageString: string = !req.query.age ? "" : `${req.query.age}`;

      let sports: string[] = sportsString.split(",");
      let ages: string[] = ageString.split(",");
      sports.forEach((sport) => {
        if (!Const.allowedSports.includes(sport)) {
          return errorResponse(
            res,
            `Get Classes Controller Error: "${sport}" is not a valid sport name`
          );
        }
      });
      ages.forEach((age) => {
        if (!Const.ageStrings.includes(age)) {
          return errorResponse(
            res,
            `Get Classes Controller Error: "${age}" is not a valid age level name`
          );
        }
      });

      if (sports.length === 0) sports = Const.allowedSports;
      if (ages.length === 0) sports = Const.allowedAgeLevels;

      let sportClasses = await findClassesBySportsAndAgeLevels({ page, size, sports, ages });

      if (!isAdmin && sportClasses !== null)
        sportClasses = sportClasses.map((sportClass: any) => sanitizeClassData(sportClass));

      return successResponse(res, { classes: sportClasses ?? {} });
    } catch (error: any) {
      return errorResponse(res, `Get Classes Controller Error: ${error.message}`);
    }
  };
