export default ({ updateOneClass }: { updateOneClass: Function }) =>
  async ({ id, updateData }: { id: string; updateData: object }) => {
    const updatedClass = await updateOneClass({ id, updateData });
    return updatedClass;
  };
