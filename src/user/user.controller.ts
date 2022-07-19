import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { createUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add')
  async add(@Body() userDto: createUserDto) {
    try {
      await this.userService.add(userDto);
      return 'Insertion Successed';
    } catch (e) {
      return `Insertion Failed: ${e}`;
    }
  }

  @Get('get/all')
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Get('get/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.get(id);
    } catch (e) {
      return `Query Failed: ${e}`;
    }
  }

  @Patch('mod/:id')
  async mod(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto,
  ) {
    try {
      await this.userService.update(id, userDto);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }

  @Patch('del/:id')
  async del(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.delete(id);
      return 'Update Successed';
    } catch (e) {
      return `Update Failed: ${e}`;
    }
  }
}
