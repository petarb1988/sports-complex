export default ({ findOneClass }: { findOneClass: Function }) =>
  async (parametersObject: object) => {
    const sportClass = await findOneClass(parametersObject);
    return sportClass;
  };
