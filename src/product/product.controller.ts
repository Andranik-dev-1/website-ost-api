import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() productData: any, @UploadedFile() file: any) {
    return await this.productService.createProduct(productData, file);
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return products
  }

  @Get('/category')
  async getProductsByCategory(@Query('categoryId') categoryId: string) {
    return await this.productService.getProductsByCategory(categoryId);
  }

  @Get('search')
  async findProductByName(@Query('name') name: string) {
    const products = await this.productService.findProductByName(name);
    return products;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }

  //for pgination
  //   @Get()
  //   async getAllProducts(
  //     @Query('page') page = 1,
  //     @Query('perPage') perPage = 10,
  //   ): Promise<Product[]> {
  //     return await this.productService.getAllProducts(page, perPage);
  //   }
}
