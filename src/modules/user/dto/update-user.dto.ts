import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Name must be string',
  })
  name!: string;

  @IsOptional()
  @IsEmail({}, { message: 'email is not valid' })
  email!: string;
}
