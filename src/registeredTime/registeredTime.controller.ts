import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisteredTimeService } from './registeredTime.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserModel } from 'src/user/user.model';
import { RegisteredTimeModel } from './registeredTime.model';

@Controller()
export class RegisteredTimeController {
  constructor(
    private readonly pointRegistrationService: RegisteredTimeService,
  ) {}

  @Post('register-entry')
  @UseGuards(AuthGuard('jwt'))
  async registerEntry(
    @CurrentUser() user: UserModel,
  ): Promise<{ data: RegisteredTimeModel }> {
    const currentTime = new Date();

    if (!user) {
      throw new InternalServerErrorException(`User not found`);
    }

    const registeredTime = await this.pointRegistrationService.registerTime(
      user,
      currentTime,
      true,
    );

    return { data: registeredTime };
  }

  @Post('register-exit')
  @UseGuards(AuthGuard('jwt'))
  async registerExit(
    @CurrentUser() user: UserModel,
  ): Promise<{ data: RegisteredTimeModel }> {
    const currentTime = new Date();

    if (!user) {
      throw new InternalServerErrorException(`User not found`);
    }

    const registeredTime = await this.pointRegistrationService.registerTime(
      user,
      currentTime,
      false,
    );

    return { data: registeredTime };
  }

  @Get('/scorelist')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@CurrentUser() user: UserModel): Promise<{ data: any[] }> {
    if (user.role !== 'admin') {
      throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
    }
    const list = await this.pointRegistrationService.findAllWithUserName();
    return { data: list };
  }
  @Get('work-seconds/:userId')
  @UseGuards(AuthGuard('jwt'))
  async calculateWorkSecondsForUser(
    @Param('userId') userId: number,
  ): Promise<{ date: Date; workSeconds: number }[]> {
    const workSeconds =
      await this.pointRegistrationService.calculateWorkSecondsForUser(userId);
    return workSeconds;
  }
}
