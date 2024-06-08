import axios from "axios";
import { useEffect, useState } from "react"
import { PlayerRequest } from "../types/type";

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

export const PostRequest = async (url:string, body:PlayerRequest) => {
    return await axios.post(url, body);
}
