import { Schema, model } from "mongoose";

interface review {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  submittedAt: number;
}

interface member {
  userId: string;
  username: string;
  enrolledAt: number;
}

interface IClass {
  sport: string;
  age: string;
  duration: number;
  description: string;
  schedule?: number[];
  members?: member[];
  reviews?: review[];
  averageRating?: number;
  createdAt: number;
  modifiedAt: number;
}

const classSchema = new Schema<IClass>(
  {
    sport: { type: String, required: true },
    age: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    schedule: [Number],
    members: [{ userId: String, username: String, enrolledAt: Number }],
    reviews: [
      {
        userId: String,
        username: String,
        rating: Number,
        comment: String,
      },
    ],
    averageRating: Number,
    createdAt: { type: Number, default: Date.now },
    modifiedAt: { type: Number, default: Date.now },
  },
  { collection: "classes", id: true }
);

const classModel = model<IClass>("Class", classSchema, "classes");

//
// *************************************************************************
// Methods

export async function createClass(data: any) {
  const result = await classModel.create(data);
  return result.toObject();
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
  return result;
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
  return result;
}

export async function findOneClass(queryParams: object) {
  const result = await classModel.findOne({ ...queryParams }).lean();
  if (result === null) return null;
  return result;
}

export async function updateOneClass({ id, updateData }: { id: string; updateData: object }) {
  const result = await classModel.findByIdAndUpdate(id, { ...updateData }, { new: true }).lean();
  if (result === null) return null;
  return result;
}

export async function deleteOneClass(id: string) {
  const result = await classModel.findByIdAndRemove(id).lean();
  if (result === null) return null;
  return result;
}
