import axios from "axios";
import { useEffect, useState } from "react"

export const useData:any = (url:string) => {
    const [data, setData] = useState([]);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data.players)
                setNumberOfPlayers(response.data.numberOfPlayers)
            })
    }, [url])

    return { data, numberOfPlayers };
}
