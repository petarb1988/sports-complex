interface InputValue {
  deleteOneUser: Function;
}

export default ({ deleteOneUser }: InputValue) =>
  async (id: string) => {
    const deletedUser = await deleteOneUser(id);
    return deletedUser;
  };
