import { compareSync, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => {
  return hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};
