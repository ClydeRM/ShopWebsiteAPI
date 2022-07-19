import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMerchandiseDto, UpdateMerchandiseDto } from './dto';
import { MerchandiseService } from './merchandise.service';

@Controller('merchandise')
export class MerchandiseController {
  constructor(private merchandiseService: MerchandiseService) {}

  @Post('add')
  async add(@Body() merchandiseDto: CreateMerchandiseDto) {
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
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.merchandiseService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod/:id')
  async mod(
    @Param('id', ParseIntPipe) id: number,
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
  async setStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('state', ParseBoolPipe) state: boolean,
  ) {
    try {
      await this.merchandiseService.setStatus(id, state);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('enable/:id')
  async enable(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('disable/:id')
  async disable(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.merchandiseService.enable(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('del/:id')
  async del(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.merchandiseService.delete(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
