import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, UpdateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  async add(@Body() categoryDto: CategoryDto) {
    try {
      await this.categoryService.add(categoryDto);
      return 'Insertion Successed';
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get/all')
  async getAll() {
    try {
      return await this.categoryService.getAll();
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Get('get/:id')
  async get(@Param('id') id: number) {
    try {
      return await this.categoryService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod')
  async mod(@Body() categoryDto: UpdateCategoryDto) {
    try {
      await this.categoryService.update(categoryDto.id, categoryDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('state/:id:state')
  async setStatus(@Param('id') id: number, @Param('state') state: boolean) {
    try {
      await this.categoryService.setStatus(id, state);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('enable/:id')
  async enable(@Param('id') id: number) {
    try {
      await this.categoryService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('disable/:id')
  async disable(@Param('id') id: number) {
    try {
      await this.categoryService.disable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
