import { IsArray, IsDateString, IsInt, IsMongoId, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export default class CreateWatchlistDto {
  @MinLength(2, {message: 'Минимальная длина названия 2'})
  @MaxLength(100, {message: 'Максимальная длина названия 100'})
  public title!: string;

  @IsDateString({}, {message: 'Поле должно быть в формате ISO'})
  public postDate!: Date;

  @IsArray({message: 'Поле "Жанры" должно быть массивом'})
  @IsMongoId({each: true, message: 'Поле "Жанры" должно содержать массив валидных ID'})
  public genres!: string[];

  @IsUrl()
  public previewVideo!: string;

  public userId!: string;

  @IsString()
  public poster!: string;

  @IsInt()
  public commentsCount!: number;
}
