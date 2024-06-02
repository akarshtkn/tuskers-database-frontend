import { Districts } from "./district";

export interface Player {
    id?:number;
    username:string;
    gameId:string;
    district:Districts
}