import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findUserByUsername(signInDto.username);
    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    if (await this.userService.findUserByUsername(signUpDto.username))
      throw new HttpException(
        'Username already in use',
        HttpStatus.BAD_REQUEST,
      );

    if (await this.userService.findUserByEmail(signUpDto.email))
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);

    //Hash the password
    const hashedPass = await bcrypt.hash(signUpDto.password, +env.SALT_ROUNDS);
    const newUserDto: SignUpDto = { ...signUpDto, password: hashedPass };

    const user = await this.userService.createUser(newUserDto);

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
