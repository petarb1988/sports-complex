export const Const = Object.freeze({
  userRoleUser: 1,
  userRoleAdmin: 2,

  userRoles: [1, 2],

  oneHourInMilliseconds: 1000 * 60 * 60,
  oneDayInMilliseconds: 1000 * 60 * 60 * 24,

  activationExpirationDuration: 1000 * 60 * 60 * 24,
  tokenExpirationDuration: 1000 * 60 * 60 * 24 * 10,

  allowedSports: [
    "baseball",
    "basketball",
    "football",
    "boxing",
    "cycling",
    "fitness",
    "golf",
    "running",
    "swimming",
    "tennis",
    "triathlon",
    "volleyball",
  ],

  allowedAgeLevels: ["children", "youth", "young_adults", "adults"],

  ageLevelLimits: { children: [7, 12], youth: [12, 18], young_adults: [18, 25], adults: [25, 200] },

  maxUsersPerClass: 10,
  maxClassesPerUser: 2,
});
