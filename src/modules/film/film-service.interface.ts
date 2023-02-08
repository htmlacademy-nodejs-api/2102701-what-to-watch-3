import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface{
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  findByGenreId(genreId: string, count?: number): Promise<DocumentType<FilmEntity>[]>;
  incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findWatchlist(): Promise<DocumentType<FilmEntity>[]>;
  findWithCommetsCount(filmId: string): Promise<DocumentType<FilmEntity>[]>;
}
