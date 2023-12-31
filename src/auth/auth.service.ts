import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.sevice';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/user.model';
import { UserPayload } from 'src/user/userPayload';
import { UserToken } from 'src/user/UserToken';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userController: UserService,
    private JwtService: JwtService,
  ) {}
  login(user: UserModel): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = this.JwtService.sign(payload);
    return {
      accessToken: token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userController.findByEmail(email);

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }
    throw new Error('Invalid email or password');
  }
}
