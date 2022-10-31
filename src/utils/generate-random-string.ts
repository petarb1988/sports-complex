import crypto from "crypto";

export default (numberOfCharacters: number = 16) => {
  const result: string = crypto
    .randomBytes(Math.floor(numberOfCharacters / 2))
    .toString("hex");
  return result;
};
