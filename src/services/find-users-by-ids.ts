export default ({ findUsersByIdsWithPagination }: { findUsersByIdsWithPagination: Function }) =>
  async (parametersObject: object) => {
    const users = await findUsersByIdsWithPagination(parametersObject);
    return users;
  };
