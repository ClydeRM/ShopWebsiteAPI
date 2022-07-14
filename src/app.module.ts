import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { MerchandiseModule } from './merchandise/merchandise.module';

@Module({
  imports: [CategoryController, MerchandiseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
