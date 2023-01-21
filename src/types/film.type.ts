import { Genre } from './genre.type.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  postDate: Date;
  genre: Genre[];
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
  favoritesFlag: boolean;
};
