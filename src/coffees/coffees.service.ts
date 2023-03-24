import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeRepository.findOneBy({ id: id });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
      //   throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeRepository.create(createCoffeeDto);
    this.coffeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const coffee = await this.coffeRepository.preload({
    //   id: id,
    //   ...updateCoffeeDto,
    // });
    // if (!coffee) {
    //   throw new NotFoundException(`Coffee ${id} not found`);
    // }
    // return this.coffeRepository.save(coffee);
    const result = await this.coffeRepository.update({ id }, updateCoffeeDto);
    if (result['affected'] != 0) {
      return 'Success';
    }
    throw new NotFoundException(`Coffee ${id} not found`);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    this.coffeRepository.remove(coffee);
  }
}
