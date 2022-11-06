import { Schema, model } from "mongoose";
import { Const, Interfaces } from "../config";

const tokenSchema = new Schema<Interfaces.IToken>(
  {
    token: String,
    tempToken: String,
    createdAt: Number,
    neverExpire: { type: Boolean, default: false },
  },
  { _id: false }
);

const sportClassSchema = new Schema<Interfaces.ISportClass>(
  {
    classId: { type: String, required: true },
    enrolledAt: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<Interfaces.IUser>(
  {
    token: tokenSchema,
    username: { type: String, required: true, index: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true },
    activationCode: String,
    role: { type: Number, default: Const.userRoleUser, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: String, required: true },
    sportClasses: [sportClassSchema],
    createdAt: { type: Number, default: Date.now },
    modifiedAt: { type: Number, default: Date.now },
  },
  { collection: "users" }
);

const userModel = model<Interfaces.IUser>("User", userSchema, "users");

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
  if (ids.length === 0) return null;
  const result = await userModel
    .find({ _id: { $in: ids } })
    .skip((page - 1) * size)
    .limit(size)
    .lean();
  if (result.length === 0) return null;
  return result.map((item) => {
    const { _id, ...other } = item;
    return { id: _id.toString(), ...other };
  });
}

export async function findOneUserById(id: string) {
  const result = await userModel.findById(id).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function findOneUser(queryParams: object) {
  const result = await userModel.findOne({ ...queryParams }).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function updateOneUser({ id, updateData }: { id: string; updateData: object }) {
  const result = await userModel
    .findByIdAndUpdate(id, { ...updateData, modifiedAt: Date.now() }, { new: true })
    .lean();
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
