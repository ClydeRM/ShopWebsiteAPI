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
  async get(@Param('id') id: string) {
    try {
      return await this.merchandiseService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod/:id')
  async mod(
    @Param('id') id: string,
    @Body() merchandiseDto: UpdateMerchandiseDto,
  ) {
    try {
      await this.merchandiseService.update(id, merchandiseDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('state/:id=:state')
  async setStatus(@Param('id') id: string, @Param('state') state: boolean) {
    try {
      await this.merchandiseService.setStatus(id, state);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('enable/:id')
  async enable(@Param('id') id: string) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('disable/:id')
  async disable(@Param('id') id: string) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
