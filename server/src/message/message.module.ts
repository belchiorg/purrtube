import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [MessageService, PrismaService],
  exports: [MessageService],
  imports: [UserModule],
})
export class MessageModule {}
