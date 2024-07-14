import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { MessageService } from 'src/message/message.service';
import { MessageDto } from 'src/message/dto/message.dto';

@Controller('stream')
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
    private readonly messageService: MessageService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(':userId')
  async createStream(
    @Param('userId') userId: string,
    @Body()
    data: {
      title: string;
      description: string;
      category: string;
    },
  ) {
    return this.streamService.createStream(userId, data);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':userId')
  async updateStream(
    @Param('userId') userId: string,
    @Body()
    data: {
      title: string;
      description: string;
      category: string;
    },
  ) {
    return this.streamService.updateStream(userId, data);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':streamId/message')
  async postMessage(
    @Param('streamId') streamId: string,
    @Body()
    data: MessageDto,
  ) {
    //TODO: This must implement websockets to notify and update the chat ...
    return new MessageDto(
      await this.messageService.createMessage(streamId, data),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':streamId/messages')
  async getStreamMessages(@Param('streamId') streamId: string) {
    return (await this.messageService.getStreamMessages(streamId)).map(
      (message) => {
        return new MessageDto(message);
      },
    );
  }
}
