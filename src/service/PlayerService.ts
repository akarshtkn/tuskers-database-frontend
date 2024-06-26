import { ApiEndPoints } from "../api/ApiEndpoints";
import { ApiClient } from "../api/ApiClient";
import { Player, PlayerRequest } from "../types/NewTypes";

const addPlayer = async (player:PlayerRequest) => {
    let { data, error } = await ApiClient.POST<Player>(ApiEndPoints.addPlayer, player);
    return{ data, error};
}

const PlayerService = {
    addPlayer,
}

export default PlayerService;