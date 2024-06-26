import { ApiEndPoints } from "../api/ApiEndpoints";
import { ApiClient } from "../api/ApiClient";
import { Player, PlayerRequest } from "../types/NewTypes";

const addPlayer = async (player:PlayerRequest) => {
    let success: boolean = false;
    let message: string = '';

    const response = await ApiClient.POST<Player>(ApiEndPoints.addPlayer, {
        username: player.username,
        gameId: player.gameId,
        district: player.district,
    });

    if(Object.keys(response.data).length > 0) {
        success = true;
    } else {
        success = false;
        message = response.error.message;
    }
    
    return{ success, message };
}

const PlayerService = {
    addPlayer,
}

export default PlayerService;