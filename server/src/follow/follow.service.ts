import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(followingUserId: string, followedUserId: string) {
    return this.prisma.follow.create({
      data: {
        followedUserId,
        followingUserId,
      },
    });
  }

  async unfollowUser(followingUserId: string, followedUserId: string) {
    return this.prisma.follow.deleteMany({
      where: {
        followedUserId,
        followingUserId,
      },
    });
  }
}
