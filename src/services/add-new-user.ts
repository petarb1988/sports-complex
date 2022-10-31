interface InputValue {
  createUser: Function;
}

export default ({ createUser }: InputValue) =>
  async (data: object) => {
    const user = await createUser(data);
    return user;
  };
