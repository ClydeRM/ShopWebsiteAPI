import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CategoryDto, UpdateCategoryDto } from './dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async add(categoryDto: CategoryDto) {
    await this.prisma.category.create({
      data: {
        name: categoryDto.name,
        desc: categoryDto.desc,
        enable: categoryDto.enable,
        deleteAt: undefined,
      },
    });
  }

  async getAll() {
    const data = await this.prisma.category.findMany({
      where: {
        deleteAt: undefined,
      },
    });
    return data;
  }

  async get(categoryDto: CategoryDto) {
    const data = await this.prisma.category.findMany({
      where: {
        id: categoryDto.id ? categoryDto.id : undefined,
        name: categoryDto.name ? categoryDto.name : undefined,
        desc: categoryDto.desc ? categoryDto.desc : undefined,
        enable: categoryDto.enable ? categoryDto.enable : undefined,
        deleteAt: categoryDto.deleteAt ? categoryDto.deleteAt : undefined,
      },
    });
    return data;
  }

  async update(whereDto: CategoryDto, dataDto: CategoryDto) {
    await this.prisma.category.updateMany({
      where: {
        id: whereDto.id ? whereDto.id : undefined,
        name: whereDto.name ? whereDto.name : undefined,
        desc: whereDto.desc ? whereDto.desc : undefined,
        enable: whereDto.enable ? whereDto.enable : undefined,
        deleteAt: whereDto.deleteAt ? whereDto.deleteAt : undefined,
      },
      data: {
        name: dataDto.name ? dataDto.name : undefined,
        desc: dataDto.desc ? dataDto.desc : undefined,
        enable: dataDto.enable ? dataDto.enable : undefined,
        deleteAt: dataDto.deleteAt ? dataDto.deleteAt : undefined,
      },
    });
  }

  async setStatus(updateDto: UpdateCategoryDto, status: boolean) {
    // Destructure
    const { id, name, desc, enable } = updateDto;

    // FIND Existed Catagory
    const existedData = await this.prisma.category.findUnique({
      where: {
        id: id,
        name: name,
        desc: desc,
        enable: status,
      },
    });

    // Guard case
    if (!existedData) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    // Update Status
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        enable,
      },
    });
  }
  async enable(whereDto: CategoryDto) {
    await this.setStatus(whereDto, true);
  }
  async disable(whereDto: CategoryDto) {
    await this.setStatus(whereDto, false);
  }
  async delete(whereDto: CategoryDto) {
    const categoryDto = new CategoryDto();
    categoryDto.deleteAt = new Date(Date.now());
    await this.update(whereDto, categoryDto);
  }
}
