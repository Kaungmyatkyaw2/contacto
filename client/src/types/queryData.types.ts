export interface ResponseDataArray<T> {
  status: string;
  result: number;
  data: {
    data: T[];
  };
}

export interface InfiniteQueryResponse<T> {
  pageParams: any[];
  pages: ResponseDataArray<T>[];
}
