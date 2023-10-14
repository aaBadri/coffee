import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOneBy({ id: id });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
      //   throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    this.coffeeRepository.save(coffee);
    return createCoffeeDto;
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
    const result = await this.coffeeRepository.update({ id }, updateCoffeeDto);
    if (result['affected'] != 0) {
      return 'Success';
    }
    throw new NotFoundException(`Coffee ${id} not found`);
  }
  async remove(id: string) {
    const coffee = await this.findOne(id);
    this.coffeeRepository.remove(coffee);
  }
}
