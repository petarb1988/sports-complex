export default ({ createUser }: { createUser: Function }) =>
  async (data: object) => {
    const user = await createUser(data);
    return user;
  };
