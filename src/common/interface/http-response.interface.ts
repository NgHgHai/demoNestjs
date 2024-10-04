import { IHttpNoneResponse } from './http-none-response.interface';

export type IHttpResponse<T> = IHttpNoneResponse & {
  data: T[] | T | null;
};
