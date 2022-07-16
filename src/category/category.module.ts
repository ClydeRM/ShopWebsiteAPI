import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService],
})
export class CategoryModule {}