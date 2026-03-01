import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CierreModule } from './modules/cierres/cierre.module';

@Module({
  imports: [DatabaseModule, CierreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
