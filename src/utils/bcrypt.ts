import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(12);
  return bcryptjs.hashSync(password, salt);
};

export const verifyPassword = (password: string, hashVal: string) =>
  bcryptjs.compareSync(password, hashVal);
