import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserParamsDto } from './dto/user-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);
    return result;
  }

  @Get('all')
  async getAll() {
    const result = await this.userService.getAllUsers();
    return result;
  }

  @Get(':id')
  async findUserById(@Param() params: UserParamsDto) {
    const result = await this.userService.findUserById(params.id);
    return result;
  }

  @Delete(':id')
  async deleteUserById(@Param() params: UserParamsDto) {
    const result = await this.userService.deleteUser(params.id);
    return result;
  }
}
