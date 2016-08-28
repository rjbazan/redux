export interface Item {
  name:string
  date:string
}

export interface AppState {
  items: Item[];
  loading: boolean;
  date_range: string;
}