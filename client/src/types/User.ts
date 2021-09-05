export interface User {
  _id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  about: string | null;
  avatar: string | null;
}

export interface LoginData {
  emailOrUsername: string;
  password: string;
}

export interface VerifyResetCodeParams {
  email: string;
  code: string;
}
