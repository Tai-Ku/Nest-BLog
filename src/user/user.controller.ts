import {
  Controller,
  Get,
  Param,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from './entities/user.entities';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.fineOne(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createUserDto: createUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(Number(id), updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<UpdateResult> {
    return this.userService.delete(Number(id));
  }
}
