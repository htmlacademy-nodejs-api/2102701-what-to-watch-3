import {Expose} from 'class-transformer';

export default class FilmTitleResponse {

  @Expose()
  public title!: string;

}
