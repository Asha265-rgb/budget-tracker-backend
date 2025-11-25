import { CreateExpenseSplitDto } from './create-expense-split.dto';
declare const UpdateExpenseSplitDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateExpenseSplitDto>>;
export declare class UpdateExpenseSplitDto extends UpdateExpenseSplitDto_base {
    status?: string;
    settledAt?: Date;
}
export {};
