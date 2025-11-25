import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string; // 'spending_by_category', 'income_vs_expense', 'cash_flow', 'net_worth'

  @Column('simple-json')
  filters: {
    startDate: string;
    endDate: string;
    categories?: string[];
    accounts?: string[];
    type?: string;
  };

  @Column('simple-json', { nullable: true })
  data: any;

  @Column({ default: 'draft' })
  status: string; // 'draft', 'saved', 'exported'

  @Column({ nullable: true })
  exportedUrl: string;

  @Column({ default: 'pdf' })
  exportFormat: string; // 'pdf', 'excel', 'csv'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.reports)
  user: User;

  // Helper methods
  isSpendingReport(): boolean {
    return this.type === 'spending_by_category';
  }

  isIncomeVsExpenseReport(): boolean {
    return this.type === 'income_vs_expense';
  }

  isCashFlowReport(): boolean {
    return this.type === 'cash_flow';
  }

  isNetWorthReport(): boolean {
    return this.type === 'net_worth';
  }

  canExport(): boolean {
    return this.status === 'saved' && this.data !== null;
  }
}