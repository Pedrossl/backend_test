import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UserSchema } from 'src/schemas/user.schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
  ) {}

  @Post()
  async create(@Body() body: UserSchema): Promise<{ data: UserModel }> {
    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    const userToCreate: UserModel = {
      ...body,
      password: hashedPassword,
      id: 0,
    };

    const user = await this.model.save(userToCreate);
    return { data: user };
  }

  @Get()
  async findAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find();
    return { data: list };
  }
}
