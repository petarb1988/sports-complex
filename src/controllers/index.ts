import { successResponse, errorResponse } from "./response-templates";
import { Const } from "../config";
import {
  generateRandomNumber,
  generateRandomString,
  encryptPassword,
  validatePassword,
  sendEmail,
} from "../utils";
import {
  // users
  addNewUser,
  findUser,
  findUsers,
  findUsersByIds,
  updateUser,
  deleteUser,
  sanitizeUserData,
  getUserAge,
  // classes
  addNewClass,
  findClass,
  findClasses,
  findClassesBySportsAndAgeLevels,
  updateClass,
  deleteClass,
  sanitizeClassData,
} from "../services";

import makeRegistrationController from "./auth-controllers/registration-controller";
import makeActivationController from "./auth-controllers/activation-controller";
import makeLoginController from "./auth-controllers/login-controller";
import makeLogoutController from "./auth-controllers/logout-controller";

import makeGetUserController from "./user-controllers/get-user-controller";
import makeGetUsersController from "./user-controllers/get-users-controller";
import makeGetUsersEnrolledDuringPeriodController from "./user-controllers/get-users-enrolled-during-period";
import makeCreateUserController from "./user-controllers/create-user-controller";
import makeUpdateUserController from "./user-controllers/update-user-controller";
import makeDeleteUserController from "./user-controllers/delete-user-controller";
import makeEnrollUserController from "./user-controllers/enroll-user-controller";
import makeUnenrollUserController from "./user-controllers/unenroll-user-controller";

import makeGetClassController from "./class-controllers/get-class-controller";
import makeGetClassesController from "./class-controllers/get-classes-controller";
import makeCreateClassController from "./class-controllers/create-class-controller";
import makeUpdateClassController from "./class-controllers/update-class-controller";
import makeDeleteClassController from "./class-controllers/delete-class-controller";
import makeReviewClassController from "./class-controllers/review-class-controller";

export const registrationController = makeRegistrationController({
  successResponse,
  errorResponse,
  generateRandomString,
  generateRandomNumber,
  encryptPassword,
  sendEmail,
  addNewUser,
  findUsers,
  getUserAge,
});
export const activationController = makeActivationController({
  successResponse,
  errorResponse,
  Const,
  findUser,
  updateUser,
});
export const loginController = makeLoginController({
  successResponse,
  errorResponse,
  generateRandomString,
  validatePassword,
  findUser,
  updateUser,
});
export const logoutController = makeLogoutController({
  successResponse,
  errorResponse,
});

export const getUserController = makeGetUserController({
  successResponse,
  errorResponse,
  findUser,
  sanitizeUserData,
});
export const getUsersController = makeGetUsersController({
  successResponse,
  errorResponse,
  findUsers,
  sanitizeUserData,
});
export const getUsersEnrolledDuringPeriodController = makeGetUsersEnrolledDuringPeriodController({
  successResponse,
  errorResponse,
  findClass,
  findUsersByIds,
});
export const createUserController = makeCreateUserController({
  successResponse,
  errorResponse,
  Const,
  generateRandomString,
  encryptPassword,
  addNewUser,
  findUsers,
  getUserAge,
});
export const updateUserController = makeUpdateUserController({
  successResponse,
  errorResponse,
  updateUser,
  sanitizeUserData,
});
export const deleteUserController = makeDeleteUserController({
  successResponse,
  errorResponse,
  deleteUser,
});
export const enrollUserController = makeEnrollUserController({
  successResponse,
  errorResponse,
  Const,
  findClass,
  updateUser,
  updateClass,
  getUserAge,
  sanitizeClassData,
});
export const unenrollUserController = makeUnenrollUserController({
  successResponse,
  errorResponse,
  findClass,
  updateUser,
  updateClass,
  sanitizeClassData,
});

export const getClassController = makeGetClassController({
  successResponse,
  errorResponse,
  findClass,
  sanitizeClassData,
});
export const getClassesController = makeGetClassesController({
  successResponse,
  errorResponse,
  Const,
  findClassesBySportsAndAgeLevels,
  sanitizeClassData,
});
export const createClassController = makeCreateClassController({
  successResponse,
  errorResponse,
  Const,
  addNewClass,
  findClasses,
});
export const updateClassController = makeUpdateClassController({
  successResponse,
  errorResponse,
  Const,
  findClass,
  findClasses,
  updateClass,
});
export const deleteClassController = makeDeleteClassController({
  successResponse,
  errorResponse,
  deleteClass,
});
export const reviewClassController = makeReviewClassController({
  successResponse,
  errorResponse,
  findClass,
  updateClass,
  sanitizeClassData,
});
