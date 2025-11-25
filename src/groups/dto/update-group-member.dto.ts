import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMemberDto } from './create-group-member.dto';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateGroupMemberDto extends PartialType(CreateGroupMemberDto) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalOwed?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalOwes?: number;
}
