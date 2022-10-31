interface InputValue {
  deleteOneClass: Function;
}

export default ({ deleteOneClass }: InputValue) =>
  async (id: string) => {
    const deletedClass = await deleteOneClass(id);
    return deletedClass;
  };
