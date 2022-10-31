interface InputValue {
  createClass: Function;
}

export default ({ createClass }: InputValue) =>
  async (data: object) => {
    const sportClass = await createClass(data);
    return sportClass;
  };
