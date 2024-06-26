import { LoginCredentials, User } from '../types/NewTypes';
import { ApiEndPoints } from '../api/ApiEndpoints';
import { ApiClient } from '../api/ApiClient';
import { HttpStatusCode } from 'axios';

const login = async (credentials:LoginCredentials) => {
    let data:User = {} as User;
    let error:string | null = null;

    const response = await ApiClient.POST<User>(ApiEndPoints.login, {
        username:credentials.username,
        password:credentials.password
    });

    if (Object.keys(response.data).length > 0) {
        data = response.data;
    } else {
        error = response.error.message;
    }

    return { data, error }
}

const logout = async() => {
    let success:boolean = false;
    let message:string = '';

    const response = await ApiClient.POST<HttpStatusCode>(ApiEndPoints.logout);

    console.log(response);
    if(Object.keys(response.error).length == 0){
        console.log("inside");
        success = true;
    } else {
        success = false;
        message = response.error.message; 
    }

    return { success, message };
};

const AuthService = {
    login,
    logout,
};

export default AuthService;
