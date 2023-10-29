import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'The email of user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The Password of user. minimum 10' })
  @MinLength(10)
  readonly password: string;
}
