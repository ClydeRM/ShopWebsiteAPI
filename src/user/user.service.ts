import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { createUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async add(userDto: createUserDto) {
    await this.prisma.user.create({
      data: userDto,
    });
  }

  async getAll() {
    return await this.prisma.user.findMany({
      where: {
        deleteAt: null,
      },
    });
  }

  async get(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: userDto,
    });
  }

  async delete(id: number) {
    const userDto = new UpdateUserDto();
    userDto.deleteAt = new Date(Date.now());
    await this.update(id, userDto);
  }
}
