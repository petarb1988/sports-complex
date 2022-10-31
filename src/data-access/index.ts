import initDatabase from "./init-database";
import {
  createUser,
  findUsersWithPagination,
  findUsersByIdsWithPagination,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from "./users-db";

import {
  createClass,
  findClassesWithPagination,
  findClassesWithPaginationBySportsAndAgeLevels,
  findOneClass,
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
  updateOneUser,
  deleteOneUser,
  //classes
  createClass,
  findClassesWithPagination,
  findClassesWithPaginationBySportsAndAgeLevels,
  findOneClass,
  updateOneClass,
  deleteOneClass,
};
