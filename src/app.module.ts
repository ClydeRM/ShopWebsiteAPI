import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CategoryModule, MerchandiseModule, UserModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
