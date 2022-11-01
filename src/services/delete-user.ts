export default ({ deleteOneUser }: { deleteOneUser: Function }) =>
  async (id: string) => {
    const deletedUser = await deleteOneUser(id);
    return deletedUser;
  };
