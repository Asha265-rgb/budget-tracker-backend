import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  preferredCurrency?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
