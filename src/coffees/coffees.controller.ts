import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

// across all endpoints
@UsePipes(ValidationPipe)
// swagger tags
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // across this endpoint
  @UsePipes(ValidationPipe)
  // swagger group with tags in the method level
  // @ApiTags('find')
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  findAll(@Query() paginationQuery) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // transform: true in main.ts file converts this line from string to number if we set type of id argument to number
    // console.log(typeof id);
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // transform: true in main.ts file makes this line true
    // console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
