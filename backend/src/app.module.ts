import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
