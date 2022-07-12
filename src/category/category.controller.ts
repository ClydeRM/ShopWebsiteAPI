import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  async addCategory(@Body() categoryDto: CategoryDto) {
    try {
      await this.categoryService.add(categoryDto);
      return 'Insertion Successed';
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get/all')
  async getAllCategory() {
    try {
      return await this.categoryService.getAll();
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get')
  async getCategory(@Body() categoryDto: CategoryDto) {
    try {
      return await this.categoryService.get(categoryDto);
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Patch('mod')
  async modCategory(@Body() [whereDto, dataDto]: CategoryDto[]) {
    try {
      await this.categoryService.update(whereDto, dataDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('state/:state')
  async setCategory(
    @Body() whereDto: CategoryDto,
    @Param('state') state: boolean,
  ) {
    try {
      await this.categoryService.setStatus(whereDto, state);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('enable')
  async enable(@Body() whereDto: CategoryDto) {
    try {
      await this.categoryService.enable(whereDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('disable')
  async disable(@Body() whereDto: CategoryDto) {
    try {
      await this.categoryService.disable(whereDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
