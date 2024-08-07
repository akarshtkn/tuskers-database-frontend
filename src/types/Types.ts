export interface LoginCredentials {
    username:string;
    password:string;
};

export interface User {
    username:string;
    name:string;
    role:string;
};

export interface Player {
    id:number;
    username:string;
    gameId:string;
    district:string;
};

export type DeletePlayer = Pick<Player, "id" | "username">;

export type PlayerRequest = Pick<Player, "username" | "gameId" | "district">;

export type PlayerResponse = Pick<Player, "id" | "username">;

export type SelectFieldType = {
    id:number;
    value:string;
};

export type ApiError = {
    status:number;
    message:string;
};

export type ErrorType = {
    value: boolean;
    message: string;
};

export type PlayerDataFilter = {
    pageNo: string;
    username: string;
    district: string;
};

export type PlayerData = {
    players: Player[];
    totalPlayers: number;
    totalPages: number;
    currentPage: number;
};