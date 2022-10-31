export default ({ updateOneUser }: { updateOneUser: Function }) =>
  async ({ id, updateData }: { id: string; updateData: object }) => {
    const updatedUser = await updateOneUser({ id, updateData });
    return updatedUser;
  };
