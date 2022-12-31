import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem<string>(this.mockData.genres);
    const releaseDate = getRandomItem<string>(this.mockData.releaseDates);
    const rating = getRandomItem<string>(this.mockData.ratings);
    const previewVideo = getRandomItem<string>(this.mockData.previewVideos);
    const video = getRandomItem<string>(this.mockData.videos);
    const actors = getRandomItems<string>(this.mockData.actors).join(',');
    const director = getRandomItem<string>(this.mockData.directors);
    const runTime = getRandomItem<string>(this.mockData.runTimes);
    const commentsCount = getRandomItem<string>(this.mockData.commentsCounts);
    const poster = getRandomItem<string>(this.mockData.posters);
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const backgroundImg = getRandomItem<string>(this.mockData.backgroundImgs);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);
    return [
      title, description, createdDate, genre, releaseDate,
      rating, previewVideo, video, actors,
      director, runTime, commentsCount, poster,
      author, email, avatar, password,
      backgroundImg, backgroundColor
    ].join('\t');
  }
}
