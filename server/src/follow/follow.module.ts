import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FollowService, PrismaService],
  exports: [FollowService],
})
export class FollowModule {}
