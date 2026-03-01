import {
  Injectable,
  BadRequestException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ICierreRepository } from './repositories/cierre.repository.interface';
import { CreateCierreDto } from './dtos/create-cierre.dto';
import { Cierre, CierreEstado } from './entities/cierre.entity';

@Injectable()
export class CierreService {
  constructor(
    @Inject('ICierreRepository')
    private readonly cierreRepository: ICierreRepository,
  ) {}

  async abrirCierre(dto: CreateCierreDto): Promise<Cierre> {
    const cierreAbierto = await this.cierreRepository.findCierreAbierto();

    if (cierreAbierto) {
      throw new BadRequestException('Ya existe un cierre abierto');
    }

    const cierre = new Cierre();
    cierre.fecha = new Date(dto.fecha);
    cierre.estado = CierreEstado.ABIERTO;
    cierre.closedAt = null;

    return this.cierreRepository.save(cierre);
  }

  async cerrarCierre(id: number): Promise<Cierre> {
    const cierre = await this.cierreRepository.findById(id);

    if (!cierre) {
      throw new NotFoundException('Cierre no encontrado');
    }

    if (cierre.estado === CierreEstado.CERRADO) {
      throw new BadRequestException('El cierre ya está cerrado');
    }

    cierre.estado = CierreEstado.CERRADO;
    cierre.closedAt = new Date();

    return this.cierreRepository.save(cierre);
  }

  async findAll(): Promise<Cierre[]> {
    return this.cierreRepository.findAll();
  }

  async findOne(id: number): Promise<Cierre> {
    const cierre = await this.cierreRepository.findById(id);

    if (!cierre) {
      throw new NotFoundException('Cierre no encontrado');
    }

    return cierre;
  }
}
