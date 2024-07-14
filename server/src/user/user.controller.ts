import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { FollowService } from 'src/follow/follow.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
  ) {}

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

  @HttpCode(HttpStatus.CREATED)
  @Post(':followedId/follow')
  async followUser(
    @Param('followedId') followedId: string,
    @Body()
    data: {
      followingId: string;
    },
  ) {
    return this.followService.followUser(data.followingId, followedId);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':followedId/unfollow')
  async unfollowUser(
    @Param('followedId') followedId: string,
    @Body()
    data: {
      followingId: string;
    },
  ) {
    return this.followService.unfollowUser(data.followingId, followedId);
  }
}
