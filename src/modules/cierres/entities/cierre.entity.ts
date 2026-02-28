import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';

@Entity({ schema: 'sales_app', name: 'cierres' })
export class Cierre {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  totalDeclarado: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  totalSistema: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  diferencia?: string;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.cierre)
  movimientos: Movimiento[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
