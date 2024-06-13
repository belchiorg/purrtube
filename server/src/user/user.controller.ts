import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return 'All users';
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return 'User by ' + id;
  }

  @Post()
  async createUser() {
    return 'Create user';
  }
}
