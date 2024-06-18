import { AxiosError } from "axios";
import axiosInstance from "./api"

type ApiResponse<T> = {
    data:T | null;
    error:string | null;
    loading:boolean;
};

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<ApiResponse<T>> => {
    let data: T | null = null;
    let error: string | null = null;
    let loading = true;

    try {
        const response = await request;
        data = response.data;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            error = err.response.data?.message || err.message;
        } else {
            error = 'An unknown error occurred';
        }
    } finally {
        loading = false;
    }

    return { data, error, loading };
};

export const getRequest = async<T> (url:string, params:Record<string, any> = {}) : Promise<ApiResponse<T>> => {
    return handleRequest(axiosInstance.get(url, { params }));
};

export const postRequest = async<T,V> (url:string, body?: T, params:Record<string, any> = {}, ) : Promise<ApiResponse<V>>=> {
    return handleRequest(axiosInstance.post(url, body, { params }));
};

export const putRequest = async<T,V> (url:string, body?: T, params:Record<string, any> = {}, ) : Promise<ApiResponse<V>>=> {
    return handleRequest(axiosInstance.put(url, body, { params }));
};

export const deleteRequest = async<T> (url:string, params:Record<string,any>) : Promise<ApiResponse<T>>=> {
    return handleRequest(axiosInstance.delete(url, { params }));
}