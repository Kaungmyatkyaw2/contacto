export interface ResponseDataArray<T> {
  status: string;
  result?: number;
  data: {
    data: T[];
  };
}
