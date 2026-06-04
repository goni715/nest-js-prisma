import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  // async getAllUsers(){

  // }
}
