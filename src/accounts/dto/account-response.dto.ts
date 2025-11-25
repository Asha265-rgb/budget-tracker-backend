import { Expose } from 'class-transformer';

export class AccountResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  balance: number;

  @Expose()
  currency: string;

  @Expose()
  accountNumber: string;

  @Expose()
  bankName: string;

  @Expose()
  status: string;

  @Expose()
  color: string;

  @Expose()
  icon: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
