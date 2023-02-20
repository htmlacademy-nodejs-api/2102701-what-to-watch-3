import UserResponse from '../../user/response/user.response.js';
import GenreResponse from '../../genre/response/genre.response.js';
import { Expose, Type } from 'class-transformer';
import FilmResponse from '../../film/response/film.response.js';

export default class WatchlistResponse {

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  @Type(() => GenreResponse)
  public genres!: GenreResponse[];

  @Expose()
  public previewVideo!: string;

  @Expose()
  public commentsCount!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose({ name: 'filmId'})
  @Type(() => FilmResponse)
  public film!: FilmResponse;

  @Expose()
  public poster!: string;

}
