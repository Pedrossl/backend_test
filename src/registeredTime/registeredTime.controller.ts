import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisteredTimeService } from './registeredTime.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserModel } from 'src/user/user.model';
import { RegisteredTimeModel } from './registeredTime.model';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller()
export class RegisteredTimeController {
  constructor(
    private readonly pointRegistrationService: RegisteredTimeService,
  ) {}

  @Get('score')
  @UseGuards(AuthGuard('jwt'))
  async testRouter(
    @CurrentUser() user: UserModel,
  ): Promise<{ data: RegisteredTimeModel[] }> {
    const currentTime = new Date();

    if (!user) {
      throw new Error(`User not found`);
    }

    const registeredTime = await this.pointRegistrationService.registerTime(
      user,
      currentTime,
    );
    console.log(registeredTime);

    return { data: [registeredTime] };
  }

  @Get('/scorelist')
  @IsPublic()
  async findAll(): Promise<{ data: RegisteredTimeModel[] }> {
    const list = await this.pointRegistrationService.findAllWithName();
    return { data: list };
  }
}
