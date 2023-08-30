import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
  ) {}

  @IsPublic()
  @Post()
  @IsPublic()
  @Post()
  async create(@Body() body: UserSchema): Promise<{ data: UserModel }> {
    try {
      const existingUser = await this.model
        .createQueryBuilder('user')
        .where('user.email = :email', { email: body.email })
        .getOne();

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const saltRounds = 15;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(body.password, salt);

      const userToCreate: UserModel = {
        ...body,
        password: hashedPassword,
        id: 0,
        registeredTimes: [],
      };

      const user = await this.model.save(userToCreate);
      return { data: user };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find();
    return { data: list };
  }
}
