import { Schema, model } from "mongoose";
import { Interfaces } from "../config";

const memberSchema = new Schema<Interfaces.IMember>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    enrolledAt: { type: Number, required: true },
    isActive: { type: Boolean, default: true, required: true },
  },
  { _id: false }
);

const reviewSchema = new Schema<Interfaces.IReview>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    submittedAt: { type: Number, required: true },
  },
  { _id: false }
);

const classSchema = new Schema<Interfaces.IClass>(
  {
    sport: { type: String, required: true, index: true },
    age: { type: String, required: true, index: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    schedule: [Number],
    members: [memberSchema],
    reviews: [reviewSchema],
    averageRating: Number,
    createdAt: { type: Number, default: Date.now },
    modifiedAt: { type: Number, default: Date.now },
  },
  { collection: "classes" }
);

const classModel = model<Interfaces.IClass>("Class", classSchema, "classes");

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
  queryParams: any;
}) {
  const result = await classModel
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

export async function findOneClassById(id: string) {
  const result = await classModel.findById(id).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function findOneClass(queryParams: any) {
  const result = await classModel.findOne(queryParams).lean();
  if (result === null) return null;
  const { _id, ...other } = result;
  return { id: _id.toString(), ...other };
}

export async function updateOneClass({ id, updateData }: { id: string; updateData: object }) {
  const result = await classModel
    .findByIdAndUpdate(id, { ...updateData, modifiedAt: Date.now() }, { new: true })
    .lean();
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
