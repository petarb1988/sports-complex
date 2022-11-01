import { Interfaces } from "../config";

export default () => (data: Interfaces.IUser) => {
  const { username, role, createdAt, ...other } = data;
  return { username, role, createdAt };
};
