import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  /*  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  followingNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  followedNumber: number; */
}
