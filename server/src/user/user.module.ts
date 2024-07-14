import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { FollowModule } from 'src/follow/follow.module';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  imports: [FollowModule],
})
export class UserModule {}
