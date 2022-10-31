interface token {
  token?: string;
  tempToken?: string;
  createdAt: number;
  neverExpire: boolean;
}

interface sportClass {
  classId: string;
  enrolledAt: number;
}

interface IUser {
  token: token;
  username: string;
  hash: string;
  salt: string;
  email: string;
  activationCode?: string;
  role: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  sportClasses?: sportClass[];
  createdAt: number;
  modifiedAt: number;
}

export default () => (data: IUser) => {
  const { username, role, createdAt, ...other } = data;
  return { username, role, createdAt };
};
