import express from "express";
import tokenChecker from "./token-checker";

import {
  getClassController,
  getClassesController,
  createClassController,
  updateClassController,
  deleteClassController,
  reviewClassController,
} from "../controllers";

export const classRoutes = express.Router();

classRoutes.get("/multi", tokenChecker(), getClassesController);
classRoutes.get("/:id", tokenChecker(), getClassController);
classRoutes.post("/:id", tokenChecker(), reviewClassController);
classRoutes.post("/", tokenChecker({ onlyAdmin: true }), createClassController);
classRoutes.patch("/:id", tokenChecker({ onlyAdmin: true }), updateClassController);
classRoutes.delete("/:id", tokenChecker({ onlyAdmin: true }), deleteClassController);
