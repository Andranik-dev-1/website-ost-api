import { Controller, Body, Post, Get, Delete, Param, Query } from '@nestjs/common';
import { CategoryesService } from './categoryes.service';
import { CreateCategoryDto } from './dto/categoryes.dto';

@Controller('categoryes')
export class CategoryesController {
  constructor(private readonly categoryesService: CategoryesService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryesService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllProducts() {
    return await this.categoryesService.getAllCategoryes();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string){
    return this.categoryesService.deleteCategoryById(id);
  }


  @Get('search')
  async findCategoryByName(@Query('name') name: string) {
    const categories = await this.categoryesService.findCategoryByName(name);
    return categories;
  }
}
