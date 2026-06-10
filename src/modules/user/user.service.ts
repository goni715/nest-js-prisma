import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data,
    });
  }

  //getAllUsers
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return users;
  }

  //findUserById
  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //delete user
  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //delete
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }

  async updateUser(id: number, payload: Partial<UpdateUserDto>) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //check email is already exist
    if (payload.email) {
      const emailExist = await this.prisma.user.findFirst({
        where: {
          id: {
            not: id,
          },
          email: payload.email,
        },
      });

      if (emailExist) {
        throw new ConflictException('Email already exists');
      }
    }

    //update
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  }
}
