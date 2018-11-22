import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPError, ReadError, RequestError } from "../exceptions/exceptions";

function wrapError(error: AxiosError) {
  if (error.response) {
    throw new HTTPError(
      error.message,
      error.response.status,
      error.response.statusText,
      error,
    );
  } else if (error.code) {
    throw new RequestError(error.message, error.code, error);
  } else if (error.config) {
    throw new ReadError(error);
  }
  throw error;
}

export function get<T>(url: string, headers: any): Promise<T> {
  return axios
    .get(url, { headers })
    .then((res: AxiosResponse) => res.data)
    .catch(wrapError);
}

export function post<T>(url: string, headers: any, data?: any): Promise<T> {
  headers["Content-Type"] = "application/json";
  return axios
    .post(url, data, { headers })
    .then((res: AxiosResponse) => res.data)
    .catch(wrapError);
}
