import { Expose } from 'class-transformer';

export class GroupResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  status: string;

  @Expose()
  currency: string;

  @Expose()
  color: string;

  @Expose()
  icon: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdById: string;

  @Expose()
  get isActive(): boolean {
    return this.status === 'active';
  }

  @Expose()
  get isFrozen(): boolean {
    return this.status === 'frozen';
  }
}
