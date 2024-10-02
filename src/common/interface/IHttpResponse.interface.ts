export interface IHttpNoneResponse {
    error_code: number;
    message: string | null;
    errors:
      | { [key: string]: string | { [key: string]: string }[] }
      | { [key: string]: string | { [key: string]: string }[] }[]
      | null;
  }
  
  export interface IHttpResponse<T> extends IHttpNoneResponse {
    data: T[] | T | null;
  }