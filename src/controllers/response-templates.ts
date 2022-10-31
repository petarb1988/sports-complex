import { Response } from "express";

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
  code: number = 500
) => {
  res.status(code);
  res.json({ result: "failure", timestamp: Date.now(), message });
};
