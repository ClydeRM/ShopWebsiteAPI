import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MerchandiseDto, UpdateMerchandiseDto } from './dto';
import { MerchandiseService } from './merchandise.service';

@Controller('merchandise')
export class MerchandiseController {
  constructor(private merchandiseService: MerchandiseService) {}

  @Post('add')
  async add(@Body() merchandiseDto: MerchandiseDto) {
    try {
      await this.merchandiseService.add(merchandiseDto);
      return 'Insertion Successed';
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get/all')
  async getAll() {
    try {
      return await this.merchandiseService.getAll();
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Get('get/:id')
  async get(@Param('id') id: number) {
    try {
      return await this.merchandiseService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod')
  async mod(@Body() merchandiseDto: UpdateMerchandiseDto) {
    try {
      await this.merchandiseService.update(merchandiseDto.id, merchandiseDto);
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('state/:id:state')
  async setStatus(@Param('id') id: number, @Param('state') state: boolean) {
    try {
      await this.merchandiseService.setStatus(id, state);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('enable/:id')
  async enable(@Param('id') id: number) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('disable/:id')
  async disable(@Param('id') id: number) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
