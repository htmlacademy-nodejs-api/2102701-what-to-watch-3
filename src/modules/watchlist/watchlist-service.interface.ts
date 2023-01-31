import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {WatchlistEntity} from './watchlist.entity.js';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';

export interface WatchlistServiceInterface {
  create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>>;
  findByUserId(userId: string): Promise<DocumentType<WatchlistEntity>[]>;
  deleteByUserId(userId: string): Promise<number | null>;
}
