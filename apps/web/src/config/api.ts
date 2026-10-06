import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

/**
 * axios >= 1.16 changed the return type of the request helpers to a conditional
 * type that does not unify with the generic `Promise<TData>` signatures emitted
 * by the generated endpoint clients. Restore the historical signatures
 * (`R = AxiosResponse<T>`) for the methods the app uses; runtime is unchanged.
 */
type LooseApiInstance = Omit<AxiosInstance, "get" | "delete" | "post" | "put" | "patch"> & {
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
};

const apiInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 120000, // 2 minutes timeout for API calls
}) as unknown as LooseApiInstance;

export default apiInstance;
