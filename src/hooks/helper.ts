import axios from "axios";
import { useEffect, useState } from "react"



const useDebounce = (url:string, value:string, delay:number):boolean => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            axios.post(url + value)
                .then(response => {
                    setDebounce(response.data);
                })
        }, delay)

        return () => clearTimeout(timerId);
    })

    return debounce;
}

export default useDebounce;