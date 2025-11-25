import { IsString, IsOptional, IsObject, IsArray, IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsObject()
  filters: {
    startDate: string;
    endDate: string;
    categories?: string[];
    accounts?: string[];
    type?: string;
  };

  @IsOptional()
  @IsString()
  exportFormat?: string;

  @IsUUID() // ← ADD THIS LINE
  userId: string; // ← ADD THIS LINE
}
