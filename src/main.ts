import 'reflect-metadata';
import {filmContainer} from './modules/film/film.container.js';
import {Container} from 'inversify';
import {applicationContainer} from './app/application.container.js';
import Application from './app/application.js';
import {Component} from './types/component.types.js';
import {userContainer} from './modules/user/user.container.js';
import {genreContainer} from './modules/genre/genre.container.js';
import {commentContainer} from './modules/comment/comment.container.js';
import {watchlistContainer} from './modules/watchlist/watchlist.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  filmContainer,
  genreContainer,
  commentContainer,
  watchlistContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
