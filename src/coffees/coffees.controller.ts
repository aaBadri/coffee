import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll() {
    return 'return coffees of flavors';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `id: ${id}`;
  }

  @Post()
  create(@Body('name') body) {
    return body;
  }
}
