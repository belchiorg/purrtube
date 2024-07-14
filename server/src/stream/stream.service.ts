import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StreamService {
  constructor(private prisma: PrismaService) {}

  async createStream(
    ownerId: string,
    data: {
      title: string;
      description: string;
      category: string;
    },
  ) {
    if (await this.findStreamByOwnerId(ownerId))
      throw new HttpException('User already streaming', HttpStatus.BAD_REQUEST);

    //TODO: Create StreamChat aswell

    return this.prisma.stream.create({
      data: {
        ownerId,
        ...data,
      },
    });
  }

  async updateStream(
    streamId: string,
    data: {
      title: string;
      description: string;
      category: string;
    },
  ) {
    return this.prisma.stream.update({
      where: {
        streamId,
      },
      data,
    });
  }

  async deleteStream(streamId: string) {
    return this.prisma.stream.delete({
      where: {
        streamId,
      },
    });
  }

  async findStreamById(streamId: string) {
    return this.prisma.stream.findUnique({
      where: {
        streamId,
      },
    });
  }

  async findStreamByOwnerId(ownerId: string) {
    return this.prisma.stream.findUnique({
      where: {
        ownerId,
      },
    });
  }
}
