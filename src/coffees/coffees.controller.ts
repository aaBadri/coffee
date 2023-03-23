import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `return coffees of flavors limit:${limit} and offset:${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `id: ${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `update id= ${id} and body=${JSON.stringify(body)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove id: ${id}`;
  }
}
