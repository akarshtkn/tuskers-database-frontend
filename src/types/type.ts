import { SelectFieldType } from "./props";

export const Districts:SelectFieldType[] = [
    {id:1, value:"ALAPPUZHA"},
    {id:2, value:"ERNAKULAM"},
    {id:3, value:"IDUKKI"},
    {id:4, value:"KANNUR"},
    {id:5, value:"KASARAGOD"},
    {id:6, value:"KOLLAM"},
    {id:7, value:"KOTTAYAM"},
    {id:8, value:"KOZHIKODE"},
    {id:9, value:"MALAPPURAM"},
    {id:10, value:"PALAKKAD"},
    {id:11, value:"PATHANAMTHITTA"},
    {id:12, value:"THIRUVANANTHAPURAM"},
    {id:13, value:"THRISSUR"},
    {id:14, value:"WAYANAD"},
    {id:15, value:"OTHERS_IN_INDIA"},
    {id:16, value:"OUTSIDE_INDIA"},
]

export enum AllDistricts {
    ALL = "ALL",
    THIRUVANANTHAPURAM = "THIRUVANANTHAPURAM",
    KOLLAM = "KOLLAM",
    PATHANAMTHITTA = "PATHANAMTHITTA",
    ALAPPUZHA = "ALAPPUZHA",
    KOTTAYAM = "KOTTAYAM",
    IDUKKI = "IDUKKI",
    ERNAKULAM = "ERNAKULAM",
    THRISSUR = "THRISSUR",
    PALAKKAD = "PALAKKAD",
    MALAPPURAM = "MALAPPURAM",
    KOZHIKODE = "KOZHIKODE",
    WAYANAD = "WAYANAD",
    KANNUR = "KANNUR",
    KASARAGOD = "KASARAGOD",
    OTHERS_IN_INDIA = "OTHERS_IN_INDIA",
    OUTSIDE_INDIA = "OUTSIDE_INDIA",
}

export interface Player {
    id:number;
    username:string;
    gameId:string;
    district:string;
}

export type PlayerRequest = Pick<Player, "username" | "gameId" | "district">