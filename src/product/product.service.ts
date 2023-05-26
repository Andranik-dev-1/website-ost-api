import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async createProduct(productData: any, file: any): Promise<Product>  {

    const imgUrl = await this.cloudinary.uploadImage(file);
    const newReadyProduct = {
      name: {
        am: productData.nameAm,
        en: productData.nameEn,
        ru: productData.nameRu,
      },
      description: {
        am: productData.descriptionAm,
        en: productData.descriptionEn,
        ru: productData.descriptionRu,
      },
      price: productData.price,
      priority: productData.priority,
      imageSrc: imgUrl,
      category: productData.categoryId,
    };
    // //saving product
    const newProduct = new this.productModel(newReadyProduct);
    return await newProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async findProductByName(name: string) {
    const products = await this.productModel
      .find({
        $or: [{ 'name.en': name }, { 'name.am': name }, { 'name.ru': name }],
      })
      .exec()
      
    return products;
  }


  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productModel.find({ category: categoryId }).exec();
    return products;
  }

  async deleteProductById(id: string): Promise<Product> {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return deletedProduct;
  }
  // to fetch by pagination
  //   async getAllProducts(page = 1, perPage = 10): Promise<Product[]> {
  //     const products = await this.productModel
  //       .find()
  //       .skip((page - 1) * perPage)
  //       .limit(perPage)
  //       .exec();
  //     return products;
  //   }
}
