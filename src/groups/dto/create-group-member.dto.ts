import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateGroupMemberDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  groupId: string;

  @IsOptional()
  @IsString()
  role?: string;
}
