import { Cierre } from '../entities/cierre.entity';

export interface ICierreRepository {
  save(cierre: Cierre): Promise<Cierre>;
  findById(id: number): Promise<Cierre | null>;
  findAll(): Promise<Cierre[]>;
  delete(id: number): Promise<void>;
  findByFecha(fecha: Date): Promise<Cierre | null>;
  findCierreAbierto(): Promise<Cierre | null>;
}
