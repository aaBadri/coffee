import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paggination) {
    const { limit, offset } = paggination;
    return `all coffees with limit ${limit} and offset ${offset}`;
  }

  @Get('/flavors')
  findAllFlavors() {
    return 'all flavors';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `coffee with number ${id}`;
  }
  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `coffee with number ${params.id}`;
  //   }
  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `coffee with number ${id}, ${body}`;
  }

  @Patch(':id')
  delete(@Param('id') id: string) {
    return `coffee with number ${id}`;
  }
}
