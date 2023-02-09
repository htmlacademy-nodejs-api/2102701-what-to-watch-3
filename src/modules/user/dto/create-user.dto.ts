import {IsEmail, IsString, Length} from 'class-validator';

export default class CreateUserDto {

  @IsEmail({}, {message: 'Валидный email'})
  public email!: string ;

  @IsString()
  public avatarPath!: string;

  @IsString()
  @Length(1, 15, {message: 'Минимальная длина 1, максимальная длина 15'})
  public name!: string;

  @IsString()
  @Length(6, 12, {message: 'Минимальная длина 6, максимальная длина 12'})
  public password!: string;
}
