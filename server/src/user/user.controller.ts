import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return 'All users';
  }

  @Get(':username')
  async getUserById(@Param('username') username: string) {
    const user = await this.userService.findUserByUsername(username);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return new UserDto(user);
  }

  @Get('me')
  async getMyUser(@Headers('Authorization') auth: string) {
    const token = auth.split(' ')[1];

    const user = await this.userService.getMyUser(token);

    return new UserDto(user);
  }
}
