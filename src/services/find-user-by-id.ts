export default ({ findOneUserById }: { findOneUserById: Function }) =>
  async (id: string) => {
    const user = await findOneUserById(id);
    return user;
  };
