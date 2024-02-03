export interface APIResponse<T> {
  data: T
}

export interface CardItem {
  name: string;
  total: number;
}

export interface ChartItem {
  name: string[];
  total: number[];
}