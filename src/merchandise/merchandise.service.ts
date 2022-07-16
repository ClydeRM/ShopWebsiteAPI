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

  async get(id: string) {
    const _id: number = +id;
    console.log(_id);
    return await this.prisma.category.findMany({
      where: {
        id: _id,
      },
    });
  }

  async update(id: string, merchandiseDto: UpdateMerchandiseDto) {
    const _id: number = parseInt(id);
    console.log(id);
    console.log(merchandiseDto.desc);
    await this.prisma.category.update({
      where: { id: _id },
      data: merchandiseDto,
    });
  }

  async setStatus(id: string, status: boolean) {
    const _id: number = +id;
    await this.prisma.category.update({
      where: { id: _id },
      data: {
        enable: status,
      },
    });
  }
  async enable(id: string) {
    await this.setStatus(id, true);
  }
  async disable(id: string) {
    await this.setStatus(id, false);
  }
  async delete(id: string) {
    const merchandiseDto = new UpdateMerchandiseDto();
    merchandiseDto.deleteAt = new Date(Date.now());
    await this.update(id, merchandiseDto);
  }
}
