export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  FilmServiceInterface: Symbol.for('FilmServiceInterface'),
  FilmModel: Symbol.for('FilmModel'),
  GenreServiceInterface: Symbol.for('GenreServiceInterface'),
  GenreModel: Symbol.for('GenreModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  WatchlistModel: Symbol.for('WatchlistModel'),
  WatchlistServiceInterface: Symbol.for('WatchlistServiceInterface'),
  GenreController: Symbol.for('GenreController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  UserController: Symbol.for('UserController'),
  FilmController: Symbol.for('FilmController'),
  CommentController: Symbol.for('CommentController'),
} as const;
