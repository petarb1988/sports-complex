import { Schema, model } from "mongoose";

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

const classSchema = new Schema<IClass>(
  {
    sport: { type: String, required: true, index: true },
    age: { type: String, required: true, index: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    schedule: [Number],
    members: [
      {
        userId: String,
        username: String,
        enrolledAt: Number,
      },
    ],
    reviews: [
      {
        userId: String,
        username: String,
        rating: Number,
        comment: String,
        submittedAt: Number,
      },
    ],
    averageRating: Number,
    createdAt: { type: Number, default: Date.now },
    modifiedAt: { type: Number, default: Date.now },
  },
  { collection: "classes" }
);

const classModel = model<IClass>("Class", classSchema, "classes");

//
// *************************************************************************
// Methods

export async function createClass(data: any) {
  const result = await classModel.create(data);
  const { _id, ...other } = result.toObject();
  return { id: _id.toString(), ...other };
}

export async function findClassesWithPagination({
  page,
  size,
  queryParams,
}: {
  page: number;
  size: number;
  queryParams: object;
}) {
  const result = await classModel
    .find({ ...queryParams })
    .skip((page - 1) * size)
    .limit(size)
    .lean();
  if (result.length === 0) return null;
  return result.map((item) => {
    const { _id, ...other } = item;
    return { id: _id.toString(), ...other };
  });
}

export async function findClassesWithPaginationBySportsAndAgeLevels({
  page,
  size,
  sports,
  ages,
}: {
  page: number;
  size: number;
  sports: string[];
  ages: string[];
}) {
  const result = await classModel
    .find({ sport: { $in: sports }, age: { $in: ages } })
    .skip((page - 1) * size)
    .limit(size)
    .lean();
  if (result.length === 0) return null;
  return result.map((item) => {
    const { _id, ...other } = item;
    return { id: _id.toString(), ...other };
  });
}

export async function findOneClass(queryParams: object) {
  const result = await classModel.findOne({ ...queryParams }).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function updateOneClass({ id, updateData }: { id: string; updateData: object }) {
  const result = await classModel.findByIdAndUpdate(id, { ...updateData }, { new: true }).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function deleteOneClass(id: string) {
  const result = await classModel.findByIdAndRemove(id).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}
