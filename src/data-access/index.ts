import initDatabase from "./init-database";
import {
  createUser,
  findUsersWithPagination,
  findUsersByIdsWithPagination,
  findOneUser,
  findOneUserById,
  updateOneUser,
  deleteOneUser,
} from "./users-db";

import {
  createClass,
  findClassesWithPagination,
  findClassesWithPaginationBySportsAndAgeLevels,
  findOneClass,
  findOneClassById,
  updateOneClass,
  deleteOneClass,
} from "./classes-db";

export {
  // init
  initDatabase,
  // users
  createUser,
  findUsersWithPagination,
  findUsersByIdsWithPagination,
  findOneUser,
  findOneUserById,
  updateOneUser,
  deleteOneUser,
  //classes
  createClass,
  findClassesWithPagination,
  findClassesWithPaginationBySportsAndAgeLevels,
  findOneClass,
  findOneClassById,
  updateOneClass,
  deleteOneClass,
};
