import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { RegisteredTimeModel } from './registeredTime.model';

@Injectable()
export class RegisteredTimeService {
  constructor(
    @InjectRepository(RegisteredTimeModel)
    private readonly registeredTimeRepository: Repository<RegisteredTimeModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}
  async registerTime(
    user: UserModel,
    currentTime: Date,
  ): Promise<RegisteredTimeModel> {
    const registeredTime = new RegisteredTimeModel();
    registeredTime.time_registered = currentTime;
    registeredTime.user = user.id;

    return this.registeredTimeRepository.save(registeredTime);
  }

  async findAllWithName(): Promise<RegisteredTimeModel[]> {
    return this.registeredTimeRepository.find({
      relations: ['user'],
    });
  }
}
