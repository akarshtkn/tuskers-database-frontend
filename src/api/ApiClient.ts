import { AxiosError } from "axios";
import { AxiosInstance } from "./ApiHelper"

type Response<T> = {
    data:T;
    error:ApiError;
};

type ApiError = {
    status:number;
    message:string;
}

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<Response<T>> => {
    let data:T = {} as T;
    let error:ApiError = {} as ApiError;

    try {
        const response = await request;
        data = response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response) {
                error.status = err.response.status;
                error.message = err.response.data?.message;
            } else if (err.request) {
                error.status = 0;
                error.message = "Network error";
            } else {
                error.status = -1;
                err.message = err.message;
            }
        } else {
            error.status = -1;
            error.message = 'An unknown error occurred';
        }
    }

    return { data, error };
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