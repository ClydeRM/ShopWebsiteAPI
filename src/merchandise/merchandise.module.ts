import { Module } from '@nestjs/common';
import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';

@Module({
  controllers: [MerchandiseController],
  providers: [MerchandiseService]
})
export class MerchandiseModule {}
