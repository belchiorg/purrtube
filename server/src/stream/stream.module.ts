import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { PrismaService } from 'src/prisma.service';
import { MessageModule } from 'src/message/message.module';

@Module({
  controllers: [StreamController],
  providers: [StreamService, PrismaService],
  imports: [MessageModule],
})
export class StreamModule {}
