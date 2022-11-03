import { Response } from "express";
import logger from "../logger";

export const successResponse = (res: Response, data: any = null) => {
  res.json({
    result: "success",
    timestamp: Date.now(),
    data: !data ? {} : data,
  });
};

export const errorResponse = (
  res: Response,
  message: string = "Something went wrong",
  error: unknown,
  code: number = 500
) => {
  logger(message, error);
  res.status(code);
  res.json({
    result: "failure",
    timestamp: Date.now(),
    message: !error ? `${message}` : `${message}: ${JSON.stringify(error)}`,
  });
};
