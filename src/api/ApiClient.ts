import { ApiError } from "../types/Types";
import { AxiosInstance } from "./ApiHelper"

type Response<T> = {
    data:T | null;
    error:ApiError | null;
};

const handleError = (error: any): ApiError => {
    if (error.isAxiosError) {
        if (error.response) {
            // Server responded with a status other than 200 range
            return {
              status: error.response.status,
              message: error.response.data?.message || 'An error occurred',
            };
        } else if (error.request) {
            // Request was made but no response received
            return {
              status: 0,
              message: 'Network error',
            };
        } else {
            // Something happened in setting up the request
            return {
              status: -1,
              message: error.message,
            };
        }
    } else {
        return {
          status: -1,
          message: 'An unknown error occurred',
        };
    }
};

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<Response<T>> => {
    try {
        const response = await request;
       return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: handleError(error) };
    }
};

const GET = async<T> (url:string, params:Record<string, any> = {}) : Promise<Response<T>> => {
    return handleRequest(AxiosInstance.get(url, { params }));
};

const POST = async<T> (url:string, body?: Record<string,string>, params?:Record<string, any>, ) : Promise<Response<T>>=> {
    return handleRequest(AxiosInstance.post(url, body, { params }));
};

const PUT = async<T> (url:string, body?: Record<string,string>, params?:Record<string, any>, ) : Promise<Response<T>>=> {
    return handleRequest(AxiosInstance.put(url, body, { params }));
};

const DELETE = async<T> (url:string, params:Record<string,any>) : Promise<Response<T>>=> {
    return handleRequest(AxiosInstance.delete(url, { params }));
}

const apiClient = {
    GET,
    POST,
    PUT,
    DELETE
}

export { apiClient as ApiClient };