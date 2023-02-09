import {IsEmail, IsString} from 'class-validator';

export default class LoginUserDto {

  @IsEmail({}, {message: 'Валидный email'})
  public email!: string;

  @IsString()
  public password!: string;
}
