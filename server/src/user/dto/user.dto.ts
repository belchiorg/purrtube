import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  creationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.creationDate = user.createdAt;
    this.userId = user.userId;
  }
}
