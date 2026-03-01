import { IsDateString } from 'class-validator';

export class CreateCierreDto {
  @IsDateString()
  fecha: string;
}
