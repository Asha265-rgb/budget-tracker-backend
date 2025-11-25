import { Expose } from 'class-transformer';

export class GroupMemberResponseDto {
  @Expose()
  id: string;

  @Expose()
  role: string;

  @Expose()
  status: string;

  @Expose()
  totalOwed: number;

  @Expose()
  totalOwes: number;

  @Expose()
  joinedAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  userId: string;

  @Expose()
  groupId: string;

  @Expose()
  get isOwner(): boolean {
    return this.role === 'owner';
  }

  @Expose()
  get isAdmin(): boolean {
    return this.role === 'admin' || this.isOwner;
  }

  @Expose()
  get isActive(): boolean {
    return this.status === 'active';
  }

  @Expose()
  get netBalance(): number {
    return this.totalOwes - this.totalOwed;
  }

  @Expose()
  get owesMoney(): boolean {
    return this.netBalance > 0;
  }

  @Expose()
  get isOwedMoney(): boolean {
    return this.netBalance < 0;
  }

  @Expose()
  get isSettled(): boolean {
    return this.netBalance === 0;
  }
}
