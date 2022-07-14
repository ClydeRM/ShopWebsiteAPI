import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MerchandiseModule } from './merchandise/merchandise.module';

@Module({
  imports: [CategoryModule, MerchandiseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
