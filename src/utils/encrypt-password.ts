import crypto from "crypto";

export default (password: string) => {
  const salt: string = crypto.randomBytes(16).toString("hex");
  const hash: string = crypto
    .pbkdf2Sync(password, `${salt}${process.env.PEANUTS}`, 1000, 64, `sha512`)
    .toString(`hex`);

  return { salt, hash };
};
