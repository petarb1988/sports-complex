import express from "express";
import tokenChecker from "./token-checker";

import {
  registrationController,
  activationController,
  loginController,
  logoutController,
} from "../controllers";

export const authRoutes = express.Router();

authRoutes.post("/register", registrationController);
authRoutes.get("/activate", activationController);
authRoutes.post("/login", loginController);
authRoutes.get("/logout", tokenChecker(), logoutController);
