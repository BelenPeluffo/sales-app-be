import { Module } from '@nestjs/common';
import { CierreService } from './cierre.service';
import { CierreController } from './cierre.controller';
import { CierreRepository } from './repositories/cierre.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cierre } from './entities/cierre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cierre])],
  controllers: [CierreController],
  providers: [
    CierreService,
    {
      provide: 'ICierreRepository',
      useClass: CierreRepository,
    },
  ],
  exports: [CierreService],
})
export class CierreModule {}
