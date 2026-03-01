import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CierreService } from './cierre.service';
import { CreateCierreDto } from './dtos/create-cierre.dto';

@Controller('cierres')
export class CierreController {
  constructor(private readonly cierreService: CierreService) {}

  @Post()
  abrir(@Body() dto: CreateCierreDto) {
    return this.cierreService.abrirCierre(dto);
  }

  @Get()
  findAll() {
    return this.cierreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cierreService.findOne(id);
  }

  @Patch(':id/cerrar')
  cerrar(@Param('id', ParseIntPipe) id: number) {
    return this.cierreService.cerrarCierre(id);
  }
}
