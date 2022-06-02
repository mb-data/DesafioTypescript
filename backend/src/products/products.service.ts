import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, price, brand, image }: CreateProductDTO) {
    return this.prisma.product.create({
      data: {
        name,
        price,
        brand,
        image,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDTO) {
    const productWithSameId = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productWithSameId) {
      throw new NotFoundException();
    }

    return this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const productWithSameId = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productWithSameId) {
      throw new NotFoundException();
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
