import {IsMongoId, IsString, Length} from 'class-validator';

export default class CreateCommentDto {

  @IsString()
  @Length(5, 1024, {message: 'Минимальная длина 5, максимальная длина 1024'})
  public text!: string;

  @IsMongoId({message: 'Поле filmId должно содержать валидный id'})
  public filmId!: string;

  public userId!: string;
}
