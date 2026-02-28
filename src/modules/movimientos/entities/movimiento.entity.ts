import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cierre } from '../../cierres/entities/cierre.entity';

@Entity({ schema: 'sales_app', name: 'movimientos' })
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Cierre, (cierre) => cierre.movimientos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cierre_id' })
  cierre: Cierre;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'timestamptz', name: 'hora', default: () => 'now()' })
  hora: Date;

  @Column({ name: 'medio_pago_id' })
  medioPagoId: string;

  @Column({ type: 'numeric' })
  monto: string;

  @Column({ type: 'text', nullable: true })
  observacion?: string | null;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
