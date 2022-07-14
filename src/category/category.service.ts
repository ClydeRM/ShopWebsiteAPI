import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async add(categoryDto: CategoryDto) {
    await this.prisma.category.create({
      data: categoryDto,
    });
  }

  async getAll() {
    return await this.prisma.category.findMany({
      where: {
        deleteAt: undefined,
      },
    });
  }

  async get(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: number, categoryDto: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: { id },
      data: categoryDto,
    });
  }

  async setStatus(id: number, status: boolean) {
    const categoryDto = new UpdateCategoryDto();
    categoryDto.enable = status;
    // Destructure
    await this.prisma.category.update({
      where: { id },
      data: categoryDto,
    });
  }
  async enable(id: number) {
    await this.setStatus(id, true);
  }
  async disable(id: number) {
    await this.setStatus(id, false);
  }
  async delete(id: number) {
    const categoryDto = new UpdateCategoryDto();
    categoryDto.deleteAt = new Date(Date.now());
    await this.update(id, categoryDto);
  }
}
