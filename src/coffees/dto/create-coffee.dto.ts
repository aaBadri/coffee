import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of Coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of Coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'The flavors of Coffee' })
  @IsString({ each: true })
  readonly flavors: string[];
}
