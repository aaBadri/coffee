import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'coffee',
      brand: 'brand1',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'coffee2',
      brand: 'brand2',
      flavors: ['chocolate2', 'vanilla2'],
    },
  ];
  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffe ${id} not found`);
      //   throw new HttpException(`Coffe ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }
  update(id: number, updateCoffeeDto: any) {
    const item = this.findOne(id);
    if (item) {
      // update
    }
  }
  remove(id: number) {
    const index = this.coffees.findIndex((item) => item.id === +id);
    if (index > -1) {
      this.coffees.splice(index, 1);
    }
  }
}