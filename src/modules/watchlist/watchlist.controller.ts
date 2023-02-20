import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { WatchlistServiceInterface } from './watchlist-service.interface.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import WatchlistResponse from './response/watchlist.response.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../common/errors/http-errors.js';
import * as core from 'express-serve-static-core';
import { RequestQuery } from '../../types/request-query.type.js';
import AddToWatchlistDto from './dto/add-to-watchlist.dto.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

type ParamsGetUser = {
  userId: string;
}

@injectable()
export default class WatchlistController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for WatchlistController...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(AddToWatchlistDto)
      ]
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Delete,
      handler: this.deleteOne,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(AddToWatchlistDto)
      ]
    });

    this.addRoute({
      path: '/:userId/films',
      method: HttpMethod.Get,
      handler: this.getFilmsFromWatchlist,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    const watchlistResponse = fillDTO(WatchlistResponse, films);
    this.send(res, StatusCodes.OK, watchlistResponse);
  }

  public async deleteOne(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, AddToWatchlistDto>,
    res: Response): Promise<void> {

    const result = await this.watchlistService.deleteOne(body.userId, body.filmId);
    this.noContent(res, result);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, AddToWatchlistDto>,
    res: Response): Promise<void> {

    const existFilm = await this.watchlistService.exist(body.userId, body.filmId);

    if (existFilm) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Film exists.',
        'WatchlistController'
      );
    }

    const result = await this.watchlistService.create(body);
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(WatchlistResponse, result)
    );
  }

  public async getFilmsFromWatchlist(
    {params}: Request<core.ParamsDictionary | ParamsGetUser, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    console.log(params);
    const films = await this.watchlistService.findByUserId(params.userId);
    console.log(films);
    this.ok(res, fillDTO(WatchlistResponse, films));
  }
}
