export interface LoginCredentials {
    username:string;
    password:string;
}

export interface User {
    username:string;
    name:string;
    role:string;
}

export interface Player {
    id:number;
    username:string;
    gameId:string;
    district:string;
}

export type PlayerRequest = Pick<Player, "username" | "gameId" | "district">

export type PlayerResponse = Pick<Player, "id" | "username">

export type ErrorType = {
    value: boolean;
    message: string;
}

export type SelectFieldType = {
    id:number;
    value:string;
}