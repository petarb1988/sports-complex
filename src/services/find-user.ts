export default ({ findOneUser }: { findOneUser: Function }) =>
  async (parametersObject: object) => {
    const user = await findOneUser(parametersObject);
    return user;
  };
