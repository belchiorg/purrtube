import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  creationDate: Date;

  constructor(message: Message & { sender: { username: string } }) {
    this.username = message.sender.username;
    this.creationDate = message.createdAt;
    this.content = message.content;
  }
}
