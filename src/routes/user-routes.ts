import express from "express";
import tokenChecker from "./token-checker";

import {
  getUserController,
  getUsersController,
  getUsersEnrolledDuringPeriodController,
  createUserController,
  updateUserController,
  deleteUserController,
  enrollUserController,
  unenrollUserController,
} from "../controllers";

export const userRoutes = express.Router();

userRoutes.get(
  "/period/:id",
  tokenChecker({ onlyAdmin: true }),
  getUsersEnrolledDuringPeriodController
);
userRoutes.get("/enroll/:id", tokenChecker(), enrollUserController);
userRoutes.get("/unenroll/:id", tokenChecker(), unenrollUserController);
userRoutes.get("/multi", tokenChecker(), getUsersController);
userRoutes.get("/:id", tokenChecker(), getUserController);
userRoutes.post("/", tokenChecker({ onlyAdmin: true }), createUserController);
userRoutes.patch("/:id", tokenChecker(), updateUserController);
userRoutes.delete("/:id", tokenChecker({ onlyAdmin: true }), deleteUserController);
