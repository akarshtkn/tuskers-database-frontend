const login = "/auth/authenticate";
const logout = "/auth/logout";
const addPlayer = "/player/add";
const duplicateUsername = "/player/check?username=";
const duplicateGameId = "/player/check?gameId=";
const getPlayerList = "/player/get";
const deletePlayer = "/player/delete";

const apiEndPoints = {
    login,
    logout,
    addPlayer,
    duplicateUsername,
    duplicateGameId,
    getPlayerList,
    deletePlayer,
}

export { apiEndPoints as ApiEndPoints };