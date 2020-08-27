/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}

export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private request = axios) {}
  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!error?.response?.status;
  }
}
