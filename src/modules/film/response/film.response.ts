import {Expose, Type} from 'class-transformer';
import GenreResponse from '../../genre/response/genre.response.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {

  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  @Type(() => GenreResponse)
  public genres!: GenreResponse[];

  @Expose()
  public releaseDate!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideo!: string;

  @Expose()
  public video!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public runTime!: string;

  @Expose()
  public commentsCount!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public poster!: string;

  @Expose()
  public backgroundImg!: string;

  @Expose()
  public backgroundColor!: string;
}
