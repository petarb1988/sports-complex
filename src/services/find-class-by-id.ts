export default ({ findOneClassById }: { findOneClassById: Function }) =>
  async (id: string) => {
    const sportClass = await findOneClassById(id);
    return sportClass;
  };
