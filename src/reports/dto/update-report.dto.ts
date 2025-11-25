import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsOptional()
  @IsObject()
  data?: any;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  exportedUrl?: string;
}
