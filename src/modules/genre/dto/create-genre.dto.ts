import {IsString} from 'class-validator';

export default class CreateGenreDto {

  @IsString()
  public name!: string;
}


