import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'coffee',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'coffee2',
      flavors: ['chocolate2', 'vanilla2'],
    },
  ];
  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    return this.coffees.find((item) => item.id === +id);
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
