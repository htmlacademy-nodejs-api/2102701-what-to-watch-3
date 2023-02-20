import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {WatchlistEntity} from './watchlist.entity.js';
import AddToWatchlistDto from './dto/add-to-watchlist.dto.js';

export interface WatchlistServiceInterface {
  findByUserId(userId: string): Promise<DocumentType<WatchlistEntity>[]>;
  create(dto: AddToWatchlistDto): Promise<DocumentType<WatchlistEntity>>;
  exist(userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null>;
  deleteOne(userId: string, filmId: string): Promise<number | null>;
}
