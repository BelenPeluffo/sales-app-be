import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Cierre } from '../../cierres/entities/cierre.entity';

@Entity({ schema: 'sales_app', name: 'movimientos' })
export class Movimiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  monto: string;

  @Column({ type: 'varchar', length: 50 })
  medioPago: string;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Cierre, (cierre) => cierre.movimientos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cierre_id' })
  cierre?: Cierre;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
