import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MerchandiseDto, UpdateMerchandiseDto } from './dto';

@Injectable()
export class MerchandiseService {
  constructor(private prisma: PrismaService) {}
  async add(merchandiseDto: MerchandiseDto) {
    await this.prisma.merchandise.create({
      data: merchandiseDto,
    });
  }

  async getAll() {
    return await this.prisma.merchandise.findMany({
      where: {
        deleteAt: undefined,
      },
    });
  }

  async get(id: number) {
    return await this.prisma.category.findMany({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, merchandiseDto: UpdateMerchandiseDto) {
    await this.prisma.category.update({
      where: { id },
      data: merchandiseDto,
    });
  }

  async setStatus(id: number, status: boolean) {
    await this.prisma.category.update({
      where: { id },
      data: {
        enable: status,
      },
    });
  }
  async enable(id: number) {
    await this.setStatus(id, true);
  }
  async disable(id: number) {
    await this.setStatus(id, false);
  }
  async delete(id: number) {
    const merchandiseDto = new UpdateMerchandiseDto();
    merchandiseDto.deleteAt = new Date(Date.now());
    await this.update(id, merchandiseDto);
  }
}
