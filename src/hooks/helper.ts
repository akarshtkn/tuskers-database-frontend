import { useEffect, useState } from "react"
import { AxiosInstance } from "../api/ApiHelper";

export const useDebounce = (url:string, delay:number):boolean => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            AxiosInstance.post(url)
                .then(response => {
                    setDebounce(response.data);
                })
        }, delay)

        return () => clearTimeout(timerId);
    },[url, delay])

    return debounce;
}
