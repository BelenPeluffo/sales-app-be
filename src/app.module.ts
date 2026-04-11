import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CierreModule } from './modules/cierres/cierre.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, CierreModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
