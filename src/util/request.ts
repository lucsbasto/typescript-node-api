import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestConfig extends AxiosRequestConfig {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private request = axios) {}
  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error?.response?.status);
  }
}