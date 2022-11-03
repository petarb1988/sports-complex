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
      const sportsString: string | null = !req.query.sport ? null : `${req.query.sport}`;
      const ageString: string | null = !req.query.age ? null : `${req.query.age}`;

      const queryParams: { page: number; size: number; sports?: string[]; ages?: string[] } = {
        page,
        size,
      };

      if (sportsString) {
        let sports: string[] = sportsString.split(",");
        sports.forEach((sport) => {
          if (!Const.allowedSports.includes(sport)) {
            return errorResponse(
              res,
              `Get Classes Controller Error: "${sport}" is not a valid sport name`
            );
          }
        });
        queryParams.sports = sports;
      } else {
        queryParams.sports = Const.allowedSports;
      }

      if (ageString) {
        let ages: string[] = ageString.split(",");
        ages.forEach((age) => {
          if (!Const.allowedAgeLevels.includes(age)) {
            return errorResponse(
              res,
              `Get Classes Controller Error: "${age}" is not a valid age level name`
            );
          }
        });
        queryParams.ages = ages;
      } else {
        queryParams.ages = Const.allowedAgeLevels;
      }

      let sportClasses = await findClassesBySportsAndAgeLevels(queryParams);

      if (!isAdmin && sportClasses !== null)
        sportClasses = sportClasses.map((sportClass: any) => sanitizeClassData(sportClass));

      return successResponse(res, { classes: sportClasses ?? [] });
    } catch (error) {
      return errorResponse(res, `Get Classes Controller Error`, error);
    }
  };
