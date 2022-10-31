import express from "express";

import { authRoutes } from "./auth-routes";
import { userRoutes } from "./user-routes";
import { classRoutes } from "./class-routes";

export const router = express.Router();

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/class", classRoutes);
