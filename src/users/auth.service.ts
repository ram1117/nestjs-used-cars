import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if user is already signed up with an email id
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already in use');
    }

    // hash the user's password - 1.generate salt, 2.hash pwd and salt, 3.join hashed result and salt
    const salt = randomBytes(8).toString('hex'); //16 characters numbers long

    const hash = (await scrypt(password, salt, 32)) as Buffer; //will return 32 chars of output

    const result = `${salt}.${hash.toString('hex')}`;
    const user = await this.usersService.create(email, result);

    return user;
  }

  signin() {}
}
