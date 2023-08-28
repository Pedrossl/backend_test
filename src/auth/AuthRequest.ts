import { Request } from 'express';
import { UserModel } from 'src/user/user.model';

export interface AuthRequest extends Request {
  user: UserModel;
}
