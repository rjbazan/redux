import {Album} from '../models/album.model'

export class Artist {
  id: number;
  name: string;
  genres: any;
  albums: Album[];
}