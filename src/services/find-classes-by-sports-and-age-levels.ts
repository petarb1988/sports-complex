export default ({
    findClassesWithPaginationBySportsAndAgeLevels,
  }: {
    findClassesWithPaginationBySportsAndAgeLevels: Function;
  }) =>
  async (parametersObject: object) => {
    const sportClasses = await findClassesWithPaginationBySportsAndAgeLevels(parametersObject);
    return sportClasses;
  };
