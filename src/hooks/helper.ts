import axios from "axios";
import { useEffect, useState } from "react"

export const useDebounce = (url:string, delay:number):boolean => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            axios.post(url)
                .then(response => {
                    setDebounce(response.data);
                })
        }, delay)

        return () => clearTimeout(timerId);
    },[url, delay])

    return debounce;
}
