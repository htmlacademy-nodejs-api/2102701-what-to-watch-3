import {Expose} from 'class-transformer';

export default class GenreResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
