import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from './dto/message.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createMessage(streamId: string, data: MessageDto) {
    const user = await this.userService.findUserByUsername(data.username);

    if (!user)
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

    return this.prisma.message.create({
      data: {
        streamId,
        senderId: user.userId,
        content: data.content,
      },
      include: {
        sender: true,
      },
    });
  }

  async getStreamMessages(streamId: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        streamId,
      },
      include: {
        sender: true,
      },
    });

    return messages;
  }
}
