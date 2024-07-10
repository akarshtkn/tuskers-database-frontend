import { LoginCredentials, User } from '../types/Types';
import { ApiEndPoints } from '../api/ApiEndpoints';
import { ApiClient } from '../api/ApiClient';

const login = async (credentials:LoginCredentials) => {
    const response = await ApiClient.POST<User>(ApiEndPoints.login, {
        username:credentials.username,
        password:credentials.password
    });
    return { data: response.data, error: response.error };
}

const logout = async() => {
    const response = await ApiClient.POST<void>(ApiEndPoints.logout);
    return { error: response.error };
};

const AuthService = {
    login,
    logout,
};

export default AuthService;
