import { IHttpNoneResponse } from './http-none-response.interface';

export type IHttpPagingResponse<T> = IHttpNoneResponse & {
  data: {
    pages?: number;
    page: number;
    amount?: number;
    data: T[] | T | null;
  };
};
