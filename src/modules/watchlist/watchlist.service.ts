import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import {Component} from '../../types/component.types.js';
import {WatchlistEntity} from './watchlist.entity.js';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';

@injectable()
export default class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) {}

  public async create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>> {
    const watchlist = await this.watchlistModel.create(dto);
    return watchlist.populate('userId');
  }

  public async findByUserId(userId: string): Promise<DocumentType<WatchlistEntity>[]> {
    return this.watchlistModel
      .find({userId})
      .populate('userId');
  }

  public async deleteByUserId(userId: string): Promise<number> {
    const result = await this.watchlistModel
      .deleteOne({userId})
      .exec();

    return result.deletedCount;
  }
}
