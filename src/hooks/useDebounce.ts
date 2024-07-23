import { useEffect, useState } from "react"
import { AxiosInstance } from "../api/ApiHelper";

export const useDebounce = ( url: string, value: string, delay: number) => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        if (value === '') {
            setDebounce(false);
            return;
        }

        const timerId = setTimeout(() => {
            AxiosInstance.post(url + value)
                .then(response => {
                    setDebounce(response.data);
                })
        }, delay)

        return () => clearTimeout(timerId);
    },[url, value, delay])

    return debounce;
}
