import CreateGenreDto from './dto/create-genre.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {GenreEntity} from './genre.entity.js';

export interface GenreServiceInterface {
  create(dto: CreateGenreDto): Promise<DocumentType<GenreEntity>>;
  findByGenreId(genreId: string): Promise<DocumentType<GenreEntity> | null>;
  findByGenreName(genre: string): Promise<DocumentType<GenreEntity> | null>;
  findByGenreNameOrCreate(genre: string, dto: CreateGenreDto): Promise<DocumentType<GenreEntity>>;
  find(): Promise<DocumentType<GenreEntity>[]>;
}
