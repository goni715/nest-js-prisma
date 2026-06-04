import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserParamsDto {
  @Type(() => Number)
  @IsInt()
  id!: number;
}
