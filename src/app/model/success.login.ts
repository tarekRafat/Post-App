import { IUser } from "./user";

export interface ILoginSuccess {
  success: string;
  message: string;
  results: IUser;
  token: string;
}
