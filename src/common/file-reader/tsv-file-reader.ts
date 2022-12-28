import { readFileSync } from 'fs';
import { GenreType } from '../../types/genre-type.enum.js';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        postDate,
        genre,
        releaseDate,
        rating,
        previewVideo,
        video,
        actors,
        director,
        runTime,
        commentsCount,
        poster,
        name,
        email,
        avatarPath,
        password,
        backgroundImg,
        bacgroundColor
      ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        genre: GenreType[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'SciFi' | 'Thriller'],
        releaseDate,
        rating,
        previewVideo,
        video,
        actors: actors.split(';'),
        director,
        runTime,
        commentsCount,
        poster,
        user: {name, email, avatarPath, password},
        backgroundImg,
        bacgroundColor,
      }));
  }
}
