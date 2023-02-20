import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {WatchlistEntity, WatchlistModel} from './watchlist.entity.js';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import WatchlistService from './watchlist.service.js';
import {Component} from '../../types/component.types.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import WatchlistController from './watchlist.controller.js';

const watchlistContainer = new Container();

watchlistContainer.bind<WatchlistServiceInterface>(Component.WatchlistServiceInterface).to(WatchlistService).inSingletonScope();
watchlistContainer.bind<types.ModelType<WatchlistEntity>>(Component.WatchlistModel).toConstantValue(WatchlistModel);
watchlistContainer.bind<ControllerInterface>(Component.WatchlistController).to(WatchlistController).inSingletonScope();

export {watchlistContainer};
