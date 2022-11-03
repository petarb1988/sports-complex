export interface IToken {
  token?: string;
  tempToken?: string;
  createdAt: number;
  neverExpire: boolean;
}

export interface ISportClass {
  classId: string;
  enrolledAt: number;
}

export interface IUser {
  id?: string;
  token: IToken;
  username: string;
  hash: string;
  salt: string;
  email: string;
  activationCode?: string;
  role: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  sportClasses?: ISportClass[];
  createdAt: number;
  modifiedAt: number;
}

export interface IReview {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

export interface IMember {
  userId: string;
  username: string;
  enrolledAt: number;
  isActive?: boolean;
}

export interface IClass {
  sport: string;
  age: string;
  duration: number;
  description: string;
  schedule?: number[];
  members?: IMember[];
  reviews?: IReview[];
  averageRating?: number;
  createdAt: number;
  modifiedAt: number;
}
