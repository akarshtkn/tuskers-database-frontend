import { useEffect, useState } from "react"
import { ApiError } from "../types/Types";

type ServiceMethod<T> = (filters: Record<string, string>) => Promise<{ data: T | null, error: ApiError | null }>;

const useFetchData = <T>(serviceMethod: ServiceMethod<T>, filters: Record<string, string>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLoading(true);
            const fetchData = async() => {
                const response = await serviceMethod(filters);
                setData(response.data);
                setError(response.error);
                setLoading(false);
            }
            fetchData();
        }, 1000);

        return (() => clearTimeout(timerId));
    }, [serviceMethod, filters])

    return { data, error, loading };
    
}

export default useFetchData;