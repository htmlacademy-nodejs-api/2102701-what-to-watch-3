import {inject, injectable} from 'inversify';
import {FilmServiceInterface} from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {SortType} from '../../types/sort-type.enum.js';

const DEFAULT_FILM_COUNT = 60;

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userId', 'genres'])
      .exec();
  }

  public async find(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_FILM_COUNT)
      .populate(['userId', 'genres'])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId', 'genres'])
      .exec();
  }

  public async findByGenreId(genreId: string, count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;
    return this.filmModel
      .find({genres: genreId}, {}, {limit})
      .populate(['userId', 'genres'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findWatchlist(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .aggregate([
        {
          $lookup: {
            from: 'watchlist',
            let: { userId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$userId', '$users'] } } },
              { $project: { _id: 1}}
            ],
            as: 'filmsInWatchlist'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, filmsInWatchlistCount: { $size: '$filmsInWatchlist'} }
        },
      ]).exec();
  }

  public async findRatingScore(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { filmId: '$_id', rating: '$rating' },
            pipeline: [
              { $match: { $expr: { $in: ['$$filmId', '$comments'] } } },
              { $project: { _id: 1}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, ratingScore: { $avg: '$comments.rating'} }
        },
        { $unset: 'comments' },
      ]).exec();
  }

  public async findWithCommetsCount(filmId: string): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .aggregate([
        {
          $match: { id: filmId}
        },
        {
          $lookup: {
            from: 'comments',
            let: { commentId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$commentId', '$comments'] } } },
              { $project: { _id: 1}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, commentsCount: { $size: '$comments'} }
        },
        { $unset: 'comments' },
      ]).exec();
  }
}
