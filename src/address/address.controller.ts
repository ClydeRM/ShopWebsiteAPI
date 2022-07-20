import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@Controller('address')
export class AddressController {
  constructor(private addrService: AddressService) {}
  @Post('add')
  async add(@Body() addrDto: CreateAddressDto) {
    try {
      await this.addrService.add(addrDto);
      return 'Insertion Successed';
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get/all')
  async getAll() {
    try {
      return await this.addrService.getAll();
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Get('get/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.addrService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod/:id')
  async mod(
    @Param('id', ParseIntPipe) id: number,
    @Body() addrDto: UpdateAddressDto,
  ) {
    try {
      await this.addrService.update(id, addrDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('del/:id')
  async del(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.addrService.delete(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
