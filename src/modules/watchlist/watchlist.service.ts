import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import {Component} from '../../types/component.types.js';
import {WatchlistEntity} from './watchlist.entity.js';
import AddToWatchlistDto from './dto/add-to-watchlist.dto.js';

@injectable()
export default class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) {}

  public async create(dto: AddToWatchlistDto): Promise<DocumentType<WatchlistEntity>> {
    const watchlist = await this.watchlistModel.create(dto);
    return watchlist.populate(['filmId', 'userId']);
  }

  public async exist (userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null> {
    return this.watchlistModel
      .findOne({userId, filmId});
  }

  public async findByUserId (userId: string): Promise<DocumentType<WatchlistEntity>[]> {
    return this.watchlistModel
      .find({userId})
      .populate(['userId', 'filmId']);
  }

  public async deleteOne(userId: string, filmId: string): Promise<number> {
    const result = await this.watchlistModel
      .deleteOne({userId, filmId})
      .exec();

    return result.deletedCount;
  }
}
