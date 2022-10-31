import { Schema, model } from "mongoose";
import { Const } from "../config";

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

const userSchema = new Schema<IUser>(
  {
    token: {
      token: String,
      tempToken: String,
      createdAt: Number,
      neverExpire: { type: Boolean, default: false },
    },
    username: { type: String, required: true, index: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true },
    activationCode: String,
    role: { type: Number, default: Const.userRoleUser, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: String, required: true },
    sportClasses: [{ classId: String, enrolledAt: Number }],
    createdAt: { type: Number, default: Date.now },
    modifiedAt: { type: Number, default: Date.now },
  },
  { collection: "users" }
);

const userModel = model<IUser>("User", userSchema, "users");

//
// *************************************************************************
// Methods

export async function createUser(data: any) {
  const result = await userModel.create(data);
  const { _id, ...other } = result.toObject();
  return { id: _id.toString(), ...other };
}

export async function findUsersWithPagination({
  page,
  size,
  queryParams,
}: {
  page: number;
  size: number;
  queryParams: object;
}) {
  const result = await userModel
    .find(queryParams)
    .skip((page - 1) * size)
    .limit(size)
    .lean();
  if (result.length === 0) return null;
  return result.map((item) => {
    const { _id, ...other } = item;
    return { id: _id.toString(), ...other };
  });
}

export async function findUsersByIdsWithPagination({
  page,
  size,
  ids,
}: {
  page: number;
  size: number;
  ids: string[];
}) {
  const result = await userModel
    .find({ id: { $in: ids } })
    .skip((page - 1) * size)
    .limit(size)
    .lean();
  if (result.length === 0) return null;
  return result.map((item) => {
    const { _id, ...other } = item;
    return { id: _id.toString(), ...other };
  });
}

export async function findOneUser(queryParams: object) {
  const result = await userModel.findOne({ ...queryParams }).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function updateOneUser({ id, updateData }: { id: string; updateData: object }) {
  const result = await userModel.findByIdAndUpdate(id, { ...updateData }, { new: true }).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function deleteOneUser(id: string) {
  const result = await userModel.findByIdAndRemove(id).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}
