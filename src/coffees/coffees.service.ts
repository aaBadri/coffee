import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly configService: ConfigService,
  ) {
    const databaseConfig = this.configService.get('database');
    console.log(
      'databaseConfig = ' +
        databaseConfig['host'] +
        ':' +
        databaseConfig['port'],
    );
    console.log(this.configService.get('database.host', 'localhost'));
  }
  findAll(paginationQuery: PaginationDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
      //   throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    // const coffee = await this.coffeRepository.preload({
    //   id: id,
    //   ...updateCoffeeDto,
    // });
    // if (!coffee) {
    //   throw new NotFoundException(`Coffee ${id} not found`);
    // }
    // return this.coffeRepository.save(coffee);

    const result = await this.coffeeRepository.update(
      { id },
      { ...updateCoffeeDto, flavors },
    );
    if (result['affected'] != 0) {
      return 'Success';
    }
    throw new NotFoundException(`Coffee ${id} not found`);
  }
  async remove(id: string) {
    const coffee = await this.findOne(id);
    this.coffeeRepository.remove(coffee);
  }
  // this is to create a flavor if does not exist (cascade inserting) and is used when you create coffee
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOneBy({ name: name });
    if (flavor) {
      return flavor;
    }
    return this.flavorRepository.create({ name });
  }
}
