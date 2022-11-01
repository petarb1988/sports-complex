export default ({ createClass }: { createClass: Function }) =>
  async (data: object) => {
    const sportClass = await createClass(data);
    return sportClass;
  };
