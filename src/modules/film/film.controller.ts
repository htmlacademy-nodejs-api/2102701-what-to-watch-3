import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto.js';
import { FilmServiceInterface } from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import DeleteFilmDto from './dto/delete-film.dto.js';
import FilmDeleteResponse from './response/film-delete.response.js';
import UpdateFilmDto from './dto/update-film.dto.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/', method: HttpMethod.Patch, handler: this.update});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    const filmResponse = fillDTO(FilmResponse, films);
    this.send(res, StatusCodes.OK, filmResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {

    const result = await this.filmService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(FilmResponse, result)
    );
  }

  public async delete(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, DeleteFilmDto>,
    res: Response): Promise<void> {

    const result = await this.filmService.deleteById(body.id);
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(FilmDeleteResponse, result)
    );
  }

  public async update(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateFilmDto>,
    res: Response): Promise<void> {

    const result = await this.filmService.updateById(body.id, body);
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(FilmResponse, result)
    );
  }
}
