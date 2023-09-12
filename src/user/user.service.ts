import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { updateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private useRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.useRepository.find({
      select: [
        'email',
        'id',
        'first_name',
        'last_name',
        'status',
        'create_at',
        'update_at',
      ],
    });
  }
  async fineOne(id: number): Promise<User> {
    const user = await this.useRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
  async create(createUserDto: createUserDto): Promise<User> {
    const pass = await createUserDto.password;
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound); // Use saltRound instead of password
    const password = await bcrypt.hash(pass, salt);

    return await this.useRepository.save({
      ...createUserDto,
      password,
    });
  }
  async update(
    id: number,
    updateUserDto: updateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.useRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found not', HttpStatus.NOT_FOUND);
    return await this.useRepository.update(id, updateUserDto);
  }
  async delete(id: number): Promise<any> {
    const user = await this.useRepository.findOneBy({ id });
    console.log(user);
    if (!user)
      throw new HttpException('User not found not', HttpStatus.NOT_FOUND);
    await this.useRepository.delete(id);
    return { kind: 'oke' };
  }
}
