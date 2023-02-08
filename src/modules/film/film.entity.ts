import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import dayjs from 'dayjs';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 100;
const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 1024;
const DEFAULT_RATING_SCORE = 0;
const MIN_DIRECTOR_LENGTH = 2;
const MAX_DIRECTOR_LENGTH = 50;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: MIN_TITLE_LENGTH, maxlength: MAX_TITLE_LENGTH})
  public title!: string;

  @prop({trim: true, required: true, minlength: MIN_DESCRIPTION_LENGTH, maxlength: MAX_DESCRIPTION_LENGTH})
  public description!: string;

  @prop({required: true, default: dayjs()})
  public postDate!: Date;

  @prop({required: true})
  public genres!: string[];

  @prop({required: true})
  public releaseDate!: string;

  @prop({required: true, default: DEFAULT_RATING_SCORE})
  public rating!: number;

  @prop({required: true})
  public previewVideo!: string;

  @prop({required: true})
  public video!: string;

  @prop({required: true})
  public actors!: string[];

  @prop({required: true, minlength: MIN_DIRECTOR_LENGTH, maxlength: MAX_DIRECTOR_LENGTH})
  public director!: string;

  @prop({required: true})
  public runTime!: number;

  @prop()
  public commentCount!: number;

  @prop({
    ref: UserEntity,
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public poster!: string;

  @prop({required: true})
  public backgroundImg!: string;

  @prop({required: true})
  public backgroundColor!: string;

}

export const FilmModel = getModelForClass(FilmEntity);
