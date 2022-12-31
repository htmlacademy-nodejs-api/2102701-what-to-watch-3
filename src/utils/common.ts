import { GenreType } from '../types/genre-type.enum.js';
import { Film } from '../types/film.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    createdDate,
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
  ] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
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
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
