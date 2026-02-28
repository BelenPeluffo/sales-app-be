import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';

export enum CierreEstado {
  ABIERTO = 'abierto',
  CERRADO = 'cerrado',
}

@Entity({ schema: 'sales_app', name: 'cierres' })
export class Cierre {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date', unique: true })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: CierreEstado,
    default: CierreEstado.ABIERTO,
  })
  estado: CierreEstado;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'closed_at', type: 'timestamptz', nullable: true })
  closedAt?: Date | null;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.cierre)
  movimientos: Movimiento[];
}
