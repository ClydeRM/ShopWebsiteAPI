import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async add(addrDto: CreateAddressDto) {
    await this.prisma.address.create({
      data: addrDto,
    });
  }

  async getAll() {
    return await this.prisma.address.findMany();
  }

  async getAllAddrByType(type: any) {
    switch (type) {
      case true:
      case false:
        return await this.prisma.address.findMany({
          where: { type },
        });
      case 'deli':
        return await this.prisma.address.findMany({
          where: { type: true },
        });
      case 'bill':
        return await this.prisma.address.findMany({
          where: { type: false },
        });
      default:
        throw new Error(
          'Must be input a boolean or a string that contains "deli" or "bill".',
        );
    }
  }

  async getAllDeliAddr() {
    return await this.getAllAddrByType(true);
  }

  async getAllBillAddr() {
    return await this.getAllAddrByType(false);
  }

  async get(id: number) {
    return await this.prisma.address.findUnique({
      where: { id },
    });
  }

  async update(id: number, addrDto: UpdateAddressDto) {
    await this.prisma.address.update({
      where: { id },
      data: addrDto,
    });
  }

  async delete(id: number) {
    const addrDto = new UpdateAddressDto();
    addrDto.deleteAt = new Date(Date.now());
    await this.update(id, addrDto);
  }
}
