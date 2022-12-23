import { GenreType } from './genre-type.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  postDate: Date;
  genre: GenreType;
  releaseDate: string;
  rating: string;
  previewVideo: string;
  video: string;
  actors: string[];
  director: string;
  runTime: string;
  commentsCount: string;
  user: User;
  poster: string;
  backgroundImg: string;
  bacgroundColor: string;
};
