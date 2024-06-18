import { Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return 'All users';
  }

  @Get('search/:id')
  async getUserById(@Param('id') id: string) {
    return 'User by ' + id;
  }

  @Get('me')
  async getMyUser(@Headers('Authorization') auth: string) {
    const token = auth.split(' ')[1];

    const user = await this.userService.getMyUser(token);

    const userDto: UserDto = {
      username: user.username,
      email: user.email,
      creationDate: user.createdAt,
      userId: user.userId,
    };

    return userDto;
  }

  @Post()
  async createUser() {
    return 'Create user';
  }
}
