import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {FilmEntity} from '../film/film.entity.js';

const {prop, modelOptions} = typegoose;

export interface WatchlistEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'watchlist'
  }
})
export class WatchlistEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public id!: string;

  @prop({
    ref: FilmEntity,
    required: true
  })
  public filmId!: Ref<FilmEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const WatchlistModel = getModelForClass(WatchlistEntity);
