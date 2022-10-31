export default ({ findUsersWithPagination }: { findUsersWithPagination: Function }) =>
  async (queryObject: any) => {
    const orQuery: any = queryObject.orQuery;
    const andQuery: any = queryObject.andQuery;

    let finalQueryObject: any = {
      page: queryObject.page ?? 1,
      size: queryObject.size ?? 20,
    };

    if (!andQuery) {
      const tempQueryArray: object[] = [];

      const keysArray: string[] = Object.keys(orQuery);

      keysArray.forEach((key: string) => {
        const tempObject: any = {};
        tempObject[key] = orQuery[key];
        tempQueryArray.push(tempObject);
      });

      finalQueryObject.queryParams["$or"] = tempQueryArray;
    } else if (!orQuery) {
      finalQueryObject.queryParams = andQuery;
    } else {
      finalQueryObject.queryParams = {};
    }

    const user = await findUsersWithPagination(finalQueryObject);
    return user;
  };
