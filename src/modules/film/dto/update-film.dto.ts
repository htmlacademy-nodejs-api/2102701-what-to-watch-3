export default class UpdateFilmDto {
  public id!: string;
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public genres?: string[];
  public releaseDate?: string;
  public rating?: string;
  public previewVideo?: string;
  public video?: string;
  public actors?: string[];
  public director?: string;
  public runTime?: string;
  public userId?: string;
  public poster?: string;
  public backgroundImg?: string;
  public bacgroundColor?: string;
  public favoritesFlag?: boolean;
}
