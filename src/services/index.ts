import {
  // users
  createUser,
  findUsersWithPagination,
  findUsersByIdsWithPagination,
  findOneUser,
  updateOneUser,
  deleteOneUser,
  // classes
  createClass,
  findClassesWithPagination,
  findClassesWithPaginationBySportsAndAgeLevels,
  findOneClass,
  updateOneClass,
  deleteOneClass,
} from "../data-access";

// users
import makeAddNewUser from "./add-new-user";
import makeFindUsers from "./find-users";
import makeFindUser from "./find-user";
import makeFindUsersByIds from "./find-users-by-ids";
import makeUpdateUser from "./update-user";
import makeDeleteUser from "./delete-user";
import makeSanitizeUserData from "./sanitize-user-data";
import makeGetUserAge from "./get-user-age";

export const addNewUser = makeAddNewUser({ createUser });
export const findUser = makeFindUser({ findOneUser });
export const findUsers = makeFindUsers({ findUsersWithPagination });
export const findUsersByIds = makeFindUsersByIds({ findUsersByIdsWithPagination });
export const updateUser = makeUpdateUser({ updateOneUser });
export const deleteUser = makeDeleteUser({ deleteOneUser });
export const sanitizeUserData = makeSanitizeUserData();
export const getUserAge = makeGetUserAge();

// classes
import makeAddNewClass from "./add-new-class";
import makeFindClass from "./find-class";
import makeFindClasses from "./find-classes";
import makeFindClassesBySportsAndAgeLevels from "./find-classes-by-sports-and-age-levels";
import makeUpdateClass from "./update-class";
import makeDeleteClass from "./delete-class";
import makeSanitizeClassData from "./sanitize-class-data";

export const addNewClass = makeAddNewClass({ createClass });
export const findClass = makeFindClass({ findOneClass });
export const findClasses = makeFindClasses({ findClassesWithPagination });
export const findClassesBySportsAndAgeLevels = makeFindClassesBySportsAndAgeLevels({
  findClassesWithPaginationBySportsAndAgeLevels,
});
export const updateClass = makeUpdateClass({ updateOneClass });
export const deleteClass = makeDeleteClass({ deleteOneClass });
export const sanitizeClassData = makeSanitizeClassData();
