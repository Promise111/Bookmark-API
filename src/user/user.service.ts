import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditDto } from './dto';

@Injectable()
export class UserService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  getMe(authUser: User) {
    try {
      return authUser;
    } catch (error) {
      throw error;
    }
  }

  async editUser(authUserId: number, dto: EditDto) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { id: authUserId },
      });

      if (!user) throw new NotFoundException({ message: 'User not found' });

      user = await this.prisma.user.update({
        where: { id: authUserId },
        data: {
          firstname: dto.firstName,
          lastname: dto.lastName,
          email: dto.email,
        },
      });
      const { hash, ...others } = user;
      return others;
    } catch (error) {
      throw error;
    }
  }
}
