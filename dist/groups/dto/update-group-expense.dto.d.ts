import { CreateGroupExpenseDto } from './create-group-expense.dto';
declare const UpdateGroupExpenseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGroupExpenseDto>>;
export declare class UpdateGroupExpenseDto extends UpdateGroupExpenseDto_base {
    status?: string;
}
export {};
