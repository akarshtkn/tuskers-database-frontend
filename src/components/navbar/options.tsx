import { NavbarOptions } from "../../types/navbar";
import { HomeIcon, UserPlusIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/20/solid";

const options:NavbarOptions[] = [
    {
        id:1,
        field:"Home",
        icon:<HomeIcon />,
        route:"/"
    },
    {
        id:2,
        field:"Add Player",
        icon:<UserPlusIcon />,
        route:"/player-add"
    },
    {
        id:3,
        field:"Player Details",
        icon:<UserGroupIcon />,
        route:"/player-details"
    },
    {
        id:4,
        field:"Players Statistics",
        icon:<ChartBarIcon />,
        route:"/list"
    }
]

export default options;