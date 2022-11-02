import { ConnectOptions, connect } from "mongoose";
import logger from "../logger";

const dbURL: string = `${process.env.DB_URL}`;
const dbName: string = `${process.env.DB_NAME}`;
const options: ConnectOptions = { dbName };

export default async () => {
  try {
    await connect(dbURL, options);
    logger(`Connected to database ${dbName}.`);
  } catch (error) {
    logger(`Database Connection Error`, error);
  }
};
