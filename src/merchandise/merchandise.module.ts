import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';

@Module({
  controllers: [MerchandiseController],
  providers: [PrismaService, MerchandiseService],
})
export class MerchandiseModule {}
