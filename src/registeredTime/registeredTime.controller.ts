import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisteredTimeService } from './registeredTime.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserModel } from 'src/user/user.model';
import { RegisteredTimeModel } from './registeredTime.model';
import { MyGateway } from 'src/gateway/gateway';

@Controller()
export class RegisteredTimeController {
  constructor(
    private readonly pointRegistrationService: RegisteredTimeService,
    private readonly myGateway: MyGateway,
  ) {}

  @Get('score')
  @UseGuards(AuthGuard('jwt'))
  async scoreRouter(
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

    this.myGateway.sendScoreListUpdate();

    return { data: [registeredTime] };
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
}
