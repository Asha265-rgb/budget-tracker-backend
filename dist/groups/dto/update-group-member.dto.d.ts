import { CreateGroupMemberDto } from './create-group-member.dto';
declare const UpdateGroupMemberDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGroupMemberDto>>;
export declare class UpdateGroupMemberDto extends UpdateGroupMemberDto_base {
    status?: string;
    totalOwed?: number;
    totalOwes?: number;
}
export {};
