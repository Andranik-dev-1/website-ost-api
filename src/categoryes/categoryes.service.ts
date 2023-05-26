import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Categoryes, CategoryesDocument } from './schemas/categoryes.schema';
import { CreateCategoryDto } from './dto/categoryes.dto';

@Injectable()
export class CategoryesService {
  constructor(
    @InjectModel(Categoryes.name)
    private categoryesModel: Model<CategoryesDocument>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categoryes> {
    const newCategory = new this.categoryesModel(createCategoryDto);
    return await newCategory.save();
  }

  async getAllCategoryes(): Promise<Categoryes[]> {
    return await this.categoryesModel.find().exec();
  }

  async findCategoryByName(name: string) {
    const categories = await this.categoryesModel
      .find({
        $or: [{ en: name }, { am: name }, { ru: name }],
      })
      .exec()
      
    return categories;
  }

  async deleteCategoryById(id: string): Promise<Categoryes> {
    const deletedCategory = await this.categoryesModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return deletedCategory;
  }
}
