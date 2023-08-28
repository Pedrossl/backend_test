import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.sevice';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userController: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userController.findByEmail(email);
    console.log(user);

    if (user) {
      console.log('Dale');
      console.log(user.password);

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        console.log('Validou');

        return { ...user, password: undefined };
      }
    }
    throw new Error('Invalid email or password');
  }
}
