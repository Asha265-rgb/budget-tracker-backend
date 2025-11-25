import { Expose } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  filters: any;

  @Expose()
  data: any;

  @Expose()
  status: string;

  @Expose()
  exportedUrl: string;

  @Expose()
  exportFormat: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  get canExport(): boolean {
    return this.status === 'saved' && this.data !== null;
  }

  @Expose()
  get isSpendingReport(): boolean {
    return this.type === 'spending_by_category';
  }

  @Expose()
  get isIncomeVsExpenseReport(): boolean {
    return this.type === 'income_vs_expense';
  }
}
