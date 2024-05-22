export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface ILogin {
  username?: string;
  email?: string;
  password?: string;
}
