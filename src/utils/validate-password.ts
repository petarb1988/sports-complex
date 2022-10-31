import crypto from "crypto";

export default ({
  password,
  hash,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}) => {
  const testHash: string = crypto
    .pbkdf2Sync(password, `${salt}${process.env.PEANUTS}`, 1000, 64, `sha512`)
    .toString(`hex`);

  if (testHash === hash) return true;
  return false;
};
