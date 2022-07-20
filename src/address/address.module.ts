import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [PrismaService, AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
