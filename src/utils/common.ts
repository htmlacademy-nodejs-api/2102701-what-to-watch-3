import { Film } from '../types/film.type.js';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    createdDate,
    genres,
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
    bacgroundColor,
  ] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    genre: genres.split(';')
      .map((name) => ({name})),
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

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const createErrorObject = (message: string) => ({
  error: message,
});

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});


