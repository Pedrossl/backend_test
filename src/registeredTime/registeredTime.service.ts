import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    isEntrance: boolean,
  ): Promise<RegisteredTimeModel> {
    const lastRegisteredTime = await this.registeredTimeRepository.findOne({
      where: { user: user.id },
      order: { time_registered: 'DESC' },
    });

    if (lastRegisteredTime && lastRegisteredTime.isEntrance === isEntrance) {
      throw new InternalServerErrorException(
        `Cannot register ${isEntrance ? 'entrance' : 'exit'} after ${
          isEntrance ? 'entrance' : 'exit'
        }`,
      );
    }

    const registeredTime = new RegisteredTimeModel();
    registeredTime.time_registered = currentTime;
    registeredTime.user = user.id;
    registeredTime.isEntrance = isEntrance;

    return this.registeredTimeRepository.save(registeredTime);
  }

  async findAllWithName(): Promise<RegisteredTimeModel[]> {
    return this.registeredTimeRepository.find({
      relations: ['user'],
    });
  }

  async findAllWithUserName(): Promise<
    { id: number; time_registered: Date; user_id: number; user_name: string }[]
  > {
    return this.registeredTimeRepository
      .createQueryBuilder('rt')
      .select(['rt.id', 'rt.time_registered', 'user.id', 'user.name'])
      .leftJoin('rt.user', 'user')
      .getRawMany();
  }

  async findUserNameById(userId: number): Promise<string> {
    const user = await this.userRepository.find({ where: { id: userId } });
    if (!user[0].id) {
      throw new Error('User not found');
    }
    return user[0].name;
  }

  async calculateWorkSecondsForUser(
    userId: number,
  ): Promise<{ date: Date; workSeconds: number }[]> {
    const result = await this.registeredTimeRepository
      .createQueryBuilder('rt')
      .select([
        'DATE(rt.time_registered) as date',
        'SUM(TIME_TO_SEC(TIMEDIFF(rt_next.time_registered, rt.time_registered))) as workSeconds',
      ])
      .leftJoin('registered_time', 'rt_next', 'rt_next.id = rt.id + 1')
      .where('rt.user = :userId', { userId })
      .andWhere('rt.isEntrance = true') // Consider only entrance points
      .andWhere('rt_next.isEntrance = false') // Consider only subsequent exit points
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    return result.map((entry) => ({
      date: entry.date,
      workSeconds: entry.workSeconds || 0,
    }));
  }
}
