const login = "/auth/authenticate";
const logout = "/auth/logout";
const addPlayer = "/player/add";
const duplicateUsername = "/player/check?username=";
const duplicateGameId = "/player/check?gameId=";

const apiEndPoints = {
    login,
    logout,
    addPlayer,
    duplicateUsername,
    duplicateGameId,
}

export { apiEndPoints as ApiEndPoints };