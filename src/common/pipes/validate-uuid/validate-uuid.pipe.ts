import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUuidPipe implements PipeTransform {
  transform(value: any) {
    if (value && !isUUID(value))
      throw new NotFoundException(`Coffee ${value} not found`);
    return value;
  }
}
