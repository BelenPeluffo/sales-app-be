import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cierre, CierreEstado } from '../entities/cierre.entity';
import { ICierreRepository } from './cierre.repository.interface';

@Injectable()
export class CierreRepository implements ICierreRepository {
  constructor(
    @InjectRepository(Cierre)
    private readonly cierreRepository: Repository<Cierre>,
  ) {}

  async save(cierre: Cierre): Promise<Cierre> {
    return this.cierreRepository.save(cierre);
  }

  async findById(id: number): Promise<Cierre | null> {
    return this.cierreRepository.findOne({ where: { id: id.toString() } });
  }

  async findAll(): Promise<Cierre[]> {
    return this.cierreRepository.find();
  }

  async delete(id: number): Promise<void> {
    await this.cierreRepository.delete(id);
  }

  async findByFecha(fecha: Date): Promise<Cierre | null> {
    return this.cierreRepository.findOne({
      where: { fecha },
    });
  }

  async findCierreAbierto(): Promise<Cierre | null> {
    return this.cierreRepository.findOne({
      where: { estado: CierreEstado.ABIERTO },
    });
  }
}
