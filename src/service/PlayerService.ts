import { ApiEndPoints } from "../api/ApiEndpoints";
import { ApiClient } from "../api/ApiClient";
import { Player, PlayerData, PlayerRequest } from "../types/Types";
import * as Yup from "yup";

const addPlayer = async (player: PlayerRequest) => {
    let validationErrors: Record<string, string> | null;

    let PlayerSchema = Yup.object().shape({
        username: Yup.string().required('Username is required').max(25, 'Username must not exceed 40 characters'),
        gameId: Yup.string().required('Game ID is required').min(11, 'Game ID must be atleast 9 characters').max(11, 'Game ID must not exceed 10 characters'),
        district: Yup.string().required('District is required'),
    })

    try{
        await PlayerSchema.validate(player, { abortEarly:false });

        const response = await ApiClient.POST<Player>(ApiEndPoints.addPlayer, {
            username: player.username,
            gameId: player.gameId,
            district: player.district,
        });
        return { data: response.data, error: response.error, validationError: null };
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            const errors: Record<string, string> = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });
            validationErrors = errors;
        } else {
            validationErrors = null;
        }

        return { data: null, error: null, validationError: validationErrors };
    };

}

const getPlayerList = async (filters: Record<string, string>) => {
    const response = await ApiClient.GET<PlayerData>(ApiEndPoints.getPlayerList, {
        pageNo: filters.pageNo,
        username: filters.username,
        district: filters.district,
    });
    return { data: response.data, error: response.error };
}

const deletePlayer = async (playerId: number) => {
    const response = await ApiClient.DELETE<void>(ApiEndPoints.deletePlayer, { 
        playerId: playerId, 
    });
    return { error: response.error };
}

const PlayerService = {
    addPlayer,
    getPlayerList,
    deletePlayer,
}

export default PlayerService;