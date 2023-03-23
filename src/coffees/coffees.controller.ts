import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll() {
    return 'return coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `id: ${id}`;
  }
}
