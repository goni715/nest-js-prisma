/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Name must be string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name!: string;

  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail({}, { message: 'email is not valid' })
  email!: string;
}
