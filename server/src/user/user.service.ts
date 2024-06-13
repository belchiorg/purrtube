import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: { username: string; email: string }) {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data,
    });
  }
}
