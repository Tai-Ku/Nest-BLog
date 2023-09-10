import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hasPassword = await this.hasPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      refresh_token: 'asdasdasd',
      password: hasPassword,
    });
  }

  private async hasPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound); // Use saltRound instead of password
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
