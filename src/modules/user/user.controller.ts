import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);
    return {
      success: true,
      message: 'User is created successfully',
      data: result,
    };
  }

  @Get('all')
  async getAll() {
    const result = await this.userService.getAllUsers();
    return {
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  async findUserById(@Param() params: UserParamsDto) {
    const result = await this.userService.findUserById(params.id);
    return {
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    };
  }

  @Delete(':id')
  async deleteUserById(@Param() params: UserParamsDto) {
    const result = await this.userService.deleteUser(params.id);
    return {
      success: true,
      message: 'User is deleted successfully',
      data: result,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param() params: UserParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.updateUser(params.id, updateUserDto);
    return {
      success: true,
      message: 'User is updated successfully',
      data: result,
    };
  }
}
