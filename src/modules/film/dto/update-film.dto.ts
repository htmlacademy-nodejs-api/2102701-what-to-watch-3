import {IsOptional, IsArray, IsDateString, IsString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsRgbColor, IsUrl} from 'class-validator';

export default class CreateFilmDto {
  @IsOptional()
  @MinLength(2, {message: 'Минимальная длина названия 2'})
  @MaxLength(100, {message: 'Максимальная длина названия 100'})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: 'Минимальная длина описания 20'})
  @MaxLength(1024, {message: 'Максимальная длина описания 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'Поле должно быть в формате ISO'})
  public postDate?: Date;

  @IsOptional()
  @IsArray({message: 'Поле "Жанры" должно быть массивом'})
  @IsMongoId({each: true, message: 'Поле "Жанры" должно содержать массив валидных ID'})
  public genres?: string[];

  @IsOptional()
  @IsString()
  public releaseDate?: string;

  @IsOptional()
  @IsInt()
  @Min(0, {message: 'Минимальное значени 0'})
  @Max(10, {message: 'Максимальное значение 10'})
  public rating?: number;

  @IsOptional()
  @IsUrl()
  public previewVideo?: string;

  @IsOptional()
  @IsUrl()
  public video?: string;

  @IsOptional()
  @IsArray({message: 'Поле "Актёры" должно быть массивом'})
  public actors?: string[];

  @IsOptional()
  @IsString()
  @MinLength(2, {message: 'Минимальная длина 2'})
  @MaxLength(50, {message: 'Максимальная длина 50'})
  public director?: string;

  @IsOptional()
  @IsInt()
  public runTime?: number;

  @IsOptional()
  @IsMongoId({message: 'Поле userId должно содержать валидный ID'})
  public userId?: string;

  @IsOptional()
  @IsString()
  public poster?: string;

  @IsOptional()
  @IsString()
  public backgroundImg?: string;

  @IsOptional()
  @IsRgbColor()
  public backgroundColor?: string;
}
