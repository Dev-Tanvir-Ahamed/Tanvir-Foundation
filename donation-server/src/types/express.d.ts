import { IUser } from "../interface/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
