import {IsArray, IsDateString, IsString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsRgbColor, IsUrl} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(2, {message: 'Минимальная длина названия 2'})
  @MaxLength(100, {message: 'Максимальная длина названия 100'})
  public title!: string;

  @MinLength(20, {message: 'Минимальная длина описания 20'})
  @MaxLength(1024, {message: 'Максимальная длина описания 1024'})
  public description!: string;

  @IsDateString({}, {message: 'Поле должно быть в формате ISO'})
  public postDate!: Date;

  @IsArray({message: 'Поле "Жанры" должно быть массивом'})
  @IsMongoId({each: true, message: 'Поле "Жанры" должно содержать массив валидных ID'})
  public genres!: string[];

  @IsString()
  public releaseDate!: string;

  @IsInt()
  @Min(0, {message: 'Минимальное значени 0'})
  @Max(10, {message: 'Максимальное значение 10'})
  public rating!: number;

  @IsUrl()
  public previewVideo!: string;

  @IsUrl()
  public video!: string;

  @IsArray({message: 'Поле "Актёры" должно быть массивом'})
  public actors!: string[];

  @IsString()
  @MinLength(2, {message: 'Минимальная длина 2'})
  @MaxLength(50, {message: 'Максимальная длина 50'})
  public director!: string;

  @IsInt()
  public runTime!: number;

  @IsMongoId({message: 'Поле userId должно содержать валидный ID'})
  public userId?: string;

  @IsString()
  public poster!: string;

  @IsString()
  public backgroundImg!: string;

  @IsRgbColor()
  public bacgroundColor!: string;
}
