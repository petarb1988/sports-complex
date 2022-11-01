export default ({ deleteOneClass }: { deleteOneClass: Function }) =>
  async (id: string) => {
    const deletedClass = await deleteOneClass(id);
    return deletedClass;
  };
