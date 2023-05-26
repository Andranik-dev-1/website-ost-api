import { Module } from '@nestjs/common';
import { CategoryesController } from './categoryes.controller';
import { CategoryesService } from './categoryes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoryes, CategoryesSchema } from './schemas/categoryes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoryes.name, schema: CategoryesSchema },
    ]),
  ],
  controllers: [CategoryesController],
  providers: [CategoryesService],
})
export class CategoryesModule {}
