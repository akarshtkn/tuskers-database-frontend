import { ApiEndPoints } from "../api/ApiEndpoints";
import { ApiClient } from "../api/ApiClient";
import { Player, PlayerRequest } from "../types/Types";

const addPlayer = async (player:PlayerRequest) => {
    const response = await ApiClient.POST<Player>(ApiEndPoints.addPlayer, {
        username: player.username,
        gameId: player.gameId,
        district: player.district,
    });
    return { data: response.data, error: response.error };
}

const PlayerService = {
    addPlayer,
}

export default PlayerService;