import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
  ) {}
  @Post()
  async create(@Body() body: PersonSchema) {
    return body;
  }

  @Get()
  async findAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find();
    return { data: list };
  }
}