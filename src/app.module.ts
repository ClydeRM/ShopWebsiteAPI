import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule.forRoot({
    isGlobal: true,
    prismaServiceOptions: {
      prismaOptions: { log: ['info'] },
      explicitConnect: true,
    },
  }),
  CategoryModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
