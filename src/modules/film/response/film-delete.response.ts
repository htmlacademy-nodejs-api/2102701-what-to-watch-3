import {Expose} from 'class-transformer';

export default class FilmDeleteResponse {

  @Expose()
  public title!: string;

  @Expose()
  public text!: string;


}
