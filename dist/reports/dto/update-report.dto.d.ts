import { CreateReportDto } from './create-report.dto';
declare const UpdateReportDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReportDto>>;
export declare class UpdateReportDto extends UpdateReportDto_base {
    data?: any;
    status?: string;
    exportedUrl?: string;
}
export {};
