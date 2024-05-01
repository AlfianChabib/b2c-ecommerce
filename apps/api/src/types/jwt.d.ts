export type IAccessToken = {
  userId: number;
  role: string;
};

export interface IRefreshToken extends IAccessToken {
  email: string;
}

export type TokensPaylaod = IRefreshToken & IAccessToken;

export interface IParsedToken {
  exp: number;
  userId: number;
  role: string;
  email: string;
}
