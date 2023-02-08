import {inject, injectable} from 'inversify';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {GenreServiceInterface} from './genre-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {GenreEntity} from './genre.entity.js';
import CreateGenreDto from './dto/create-genre.dto.js';
import { SortType } from '../../types/sort-type.enum.js';

const MAX_GENRES_COUNT = 9;

@injectable()
export default class GenreService implements GenreServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.GenreModel) private readonly genreModel: ModelType<GenreEntity>
  ) {}

  public async create(dto: CreateGenreDto): Promise<DocumentType<GenreEntity>> {
    const result = await this.genreModel.create(dto);
    this.logger.info(`New genre created: ${dto.name}`);
    return result;
  }

  public async findByGenreId(genreId: string): Promise<DocumentType<GenreEntity> | null> {
    return this.genreModel.findById(genreId).exec();
  }

  public async findByGenreName(genre: string): Promise<DocumentType<GenreEntity> | null> {
    return this.genreModel.findOne({name: genre}).exec();
  }

  public async findByGenreNameOrCreate(genreName: string, dto: CreateGenreDto): Promise<DocumentType<GenreEntity>> {
    const existedGenre = await this.findByGenreName(genreName);

    if (existedGenre) {
      return existedGenre;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<GenreEntity>[]> {
    return this.genreModel
      .aggregate([
        {
          $lookup: {
            from: 'films',
            let: { genreId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$genreId', '$genres'] } } },
              { $project: { _id: 1}}
            ],
            as: 'films'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'}, filmCount: { $size: '$films'} }
        },
        { $unset: 'films' },
        { $limit: MAX_GENRES_COUNT},
        { $sort: { filmsCount: SortType.Down } }
      ]).exec();
  }
}
